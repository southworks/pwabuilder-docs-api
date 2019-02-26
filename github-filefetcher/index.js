const fetch = require("fetch");
const fs = require("fs");
const config = require('../config');
const constants = require('../constants');

module.exports = async (snippet, file) => {
    let path = '';
    const filesList =  JSON.parse(fs.readFileSync(config.repositoryIndexPath, "utf-8"));
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
        fetch.fetchUrl(`https://api.github.com/repos/pwa-builder/pwabuilder-snippits/contents/src/${path}?`, (error, meta, body) => {
            if (error) {
                console.log(error);
            }
            const file_metadata = JSON.parse(body.toString());
            resolve(file_metadata.download_url);
        })
    })

    return promise;

}
