const fetchService = require("./fetchService");
const fs = require("fs");
const config = require('../config');
const constants = require('../constants');
const fetch = require("fetch");

const FetchStream = fetch.FetchStream;


module.exports = async (snippet, file) => {
    let path = '';
    //using sync as callback alternative is deprecated
    if(!fs.existsSync(config.repositoryIndexPath)){ 
        const downloadurl = await fetchService(config.snippetsURL)
        await downloadFile(downloadurl, config.repositoryIndexPath);
    }
    const filesList = await readIndex(config.repositoryIndexPath);
    if (!filesList[snippet]) {
        return false;
    }
        console.log(filesList[snippet]);
        console.log(filesList[snippet].snippets);
        var pathlist = [];
        var urlList = [];
        pathlist.push(filesList[snippets].docs).then(
        filesList[snippet].snippets.forEach(function(element) {
            console.log(isArray(filesList[snippet].snippets));
            pathlist.push(filesList[snippet].snippets[element]);   
            console.log(filesList[snippet].snippets[element]);            
         }))
           
                .then( pathlist.forEach(async function(path) {
                            console.log('segundoforeach');
                            let url = await fetchService(`${config.baseGitHubUrl}${config.ownerGitHubUrl}${config.repoGitHubUrl}${config.endpointGithubUrl}${path}?`);
                            urlList.push(url);
                        }))
                
     
    //let urlfile = await fetchService(`${config.baseGitHubUrl}${config.ownerGitHubUrl}${config.repoGitHubUrl}${config.endpointGithubUrl}${path}?`);
    console.log(urlList);
    return urlList;
//TODO : agregar service desde jiraexporttoool
}


const readIndex = async function (path) {
    const promise = new Promise(async function (resolve, reject) {
        console.log("entro al read");
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

async function downloadFile(url, dest) {
    
    
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        console.log('creo write stream');
        const fetchStream =  new FetchStream("https://raw.githubusercontent.com/southworkscom/pwabuilder-snippits/add/snippits-index/snippets.json");
        console.log('creo el fetchstream');
        fetchStream.pipe(file);

        fetchStream.on('end', () => {
            console.log('downloaded!');
        });

        file.on("finish", () => {
            resolve();
        });

        file.on("error", err => {
            file.close();

            if (err.code === "EEXIST") {
                reject("File already exists");
            } else {
                fs.unlink(dest, () => {}); // Delete temp file
                reject(err.message);
            }
        });
    });
}