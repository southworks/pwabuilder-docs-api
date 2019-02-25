const app = require('express')();
const getDowndloadURL = require('./github-filefetcher/index');

app.get('/get', async function(req,res){
    let url = await getDowndloadURL(req.query.snippet, req.query.file);
    if(url){
        res.status(200).send({
            url: url
        })
    } else {
        res.status(404).send({
            error: "Snippet or file doesn't exits"
        })
    }
})

app.listen(3000, () => {
    console.log(`server running on port 3000`)
  });
