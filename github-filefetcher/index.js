const fetchService = require("./fetchService");
const fs = require("fs");
const config = require('../config');
const constants = require('../constants');
const fetch = require("fetch");
const download = require("download");
const { StringDecoder } = require('string_decoder');
const FetchStream = fetch.FetchStream;


module.exports = {
    getSingleSnippet: async (snippet) => {
        return getSnippetsIndex().then((snippetsIndex) => {
            if(!snippetsIndex[snippet]) {
                throw new Error("The requested snippet does not exists or is not indexed");
            }

            return snippetsIndex[snippet];
        }).then(getSnippetMetadata);
    },
    getAllSnippets: async () => {
        return getSnippetsIndex().then((snippets) =>{
           return Promise.all(Object.keys(snippets).map((snippet) => {
                return getSnippetMetadata(snippets[snippet]);

            }));
            
        });
    }
}

const getSnippetsIndex = async () => {
    if (!fs.existsSync(config.repositoryIndexPath)) {
        const downloadUrl = await fetchService(`${config.baseGitHubUrl}/${config.ownerGitHubUrl}/${config.repoGitHubUrl}/${config.endpointGithubUrl}/${config.snippetsURL}`);
        await downloadFile(downloadUrl, config.repositoryIndexPath);
    }
    return await readIndex(config.repositoryIndexPath);
}

const getSnippetMetadata = async (snippet) => {
    let pathlist = [];

    pathlist.push(snippet.docs);

    const results = await Promise.all(pathlist.concat(snippet.snippets)
        .map((path) => {
            const promise = fetchService(`${config.baseGitHubUrl}/${config.ownerGitHubUrl}/${config.repoGitHubUrl}/${config.endpointGithubUrl}/${path}?ref=add/snippits-index`);

            if (path.includes(constants.DOCS)) {
                return promise.then((downloadUrl) => downloadHTMLFromURL(downloadUrl));
            }

            return promise;
        }));

    return results.reduce((previous, current) => {
        if (!current.includes(config.repoGitHubUrl)) {
            previous.docs = current;
        }
        else {
            previous.snippets.push(current);
        }
        return previous;
    }, {
            docs: "",
            snippets: []
        });
}

const downloadHTMLFromURL = (downloadURL) => {
    return download(downloadURL).then((buffer) => {
        let decoder = new StringDecoder('utf8');
        return decoder.write(buffer);
    });
}

const readIndex = (path) => {
    const promise = new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (err, contents) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            const file_list = JSON.parse(contents);
            resolve(file_list);
        })
    })
    return promise;
}

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const fetchStream = new FetchStream(url);
        fetchStream.pipe(file);

        file.on("finish", () => resolve());

        file.on("error", err => {
            file.close();

            if (err.code === "EEXIST") {
                reject("File already exists");
            } else {
                fs.unlink(dest, () => { }); // Delete temp file
                reject(err.message);
            }
        });

    });
}