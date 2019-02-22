var http = require('http');
const fetch = require("fetch");
const snippets = require("./snippets.json")

console.log("snippets ", snippets.compactOverlay.docs)

//create a server object:
http.createServer(function (req, res) {
    fetchResponse(`https://api.github.com/repos/pwa-builder/pwabuilder-snippits/contents/src/${snippets.compactOverlay.docs}?`);
    res.end(); 
}).listen(8081); 


function fetchResponse(url){
    console.log("URL", url)
    fetch.fetchUrl(url, (error, meta, body) => {
    if(error){
        console.log(error);
        process.exit();
    }
    const file_metadata = JSON.parse(body.toString());
    console.log(file_metadata.download_url);
});
}