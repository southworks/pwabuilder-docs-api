
const fetch = require("fetch");

module.exports = (url, options) => {
    return new Promise((resolve, reject) => {
        fetch.fetchUrl(url, options, (error, meta, body) => {
           if(error || !body){
                reject(error || meta.status);
           }
           const file_metadata;
           resolve(file_metadata.download_url = JSON.parse(body.toString()));
        });
    })
    
};