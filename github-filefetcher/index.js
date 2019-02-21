var http = require('http');
var fetchFileFromGitHub = require('./getSnippet');
const fetch = require("fetch");

// module.exports = async function (context, req) {

//     var snippetFile = await fetchFileFromGitHub("https://api.github.com/repos/pwa-builder/pwabuilder-snippits/contents/consumable-urls.txt?");
//     res.write(snippetFile); //write a response to the client
    
// };

//create a server object:
http.createServer(function (req, res) {
    fetchResponse("https://api.github.com/repos/pwa-builder/pwabuilder-snippits/contents/consumable-urls.txt?");
    res.end(); 
}).listen(8081); 


function fetchResponse(url){

    fetch.fetchUrl(url, (error, meta, body) => {
    if(error){
        console.log(error);
        process.exit();
    }
    const file_metadata = JSON.parse(body.toString());
    console.log(file_metadata.download_url);
});
}