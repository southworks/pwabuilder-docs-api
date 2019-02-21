
const fetch = require("fetch");

fetchFileFromGitHub = function (url) {
   
    fetch.fetchUrl(url, (error, meta, body) => {
        if (error) {
            console.log(error);
            process.exit();
        }
        const file_metadata = JSON.parse(body.toString());
        return  file_metadata.download_url;
    })
};

module.exports = fetchFileFromGitHub