const fetch = require("fetch");
const fs = require("fs");
const config = require('../config');
const constants = require('../constants');

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
            resolve(file_metadata.download_url);
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