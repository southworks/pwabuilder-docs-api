const fetch = require("fetch");
const fs = require("fs-extra");
const config = require('../config');
const constants = require('../constants');
const download = require('download');

module.exports = async (snippet, file) => {
    let path = '';
    const filesList = await readIndex(config.repositoryIndexPath);
    if (!filesList[snippet]) {
        return false;
    }
    if (file == constants.DOCS) {
        path = filesList[snippet].docs;
    }
    if (file == constants.EXAMPLE) {
        path = filesList[snippet].example;

    }

    const promise = new Promise(function (resolve, reject) {
        fetch.fetchUrl(`${config.baseGitHubUrl}${config.ownerGitHubUrl}${config.repoGitHubUrl}${config.endpointGithubUrl}${path}?`, (error, meta, body) => {
            if (error) {
                console.log(error);
            }

            const file_metadata = JSON.parse(body.toString());
            let snippetContent = downloadHTMLFromURL(file_metadata.download_url);
            resolve(snippetContent);
        })
    })

    return promise;

}


const readIndex = async function (path) {
    const promise = new Promise(async function (resolve, reject) {
        await fs.readFile(path, "utf-8", function (err, contents) {
            if (err) {
                reject(err);
                console.log(err);
            }

            const file_list = JSON.parse(contents);
            resolve(file_list);
        })
    })

    return promise;

}

const downloadHTMLFromURL = function (downloadURL) {

    const promise = new Promise(async function (resolve, reject) {
        var dir = constants.SNIPPETS_FOLDER;
        var fileName = downloadURL.substring(downloadURL.lastIndexOf('/') + 1);

        fs.ensureDir(dir, err => {
            download(downloadURL).pipe(fs.createWriteStream(dir + fileName));
        })

        fs.readFile(dir + fileName, "utf8", (err, data) => {
            if (err) throw err;
            const file_content = data;
            resolve(file_content);
        });
    });
    return promise;
}