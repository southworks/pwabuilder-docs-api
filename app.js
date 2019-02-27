const app = require('express')();
const getContentURL = require('./github-filefetcher');
const config = require('./config');
const constants = require('./constants');

app.get('/', async function(req,res){
    let content = await getContentURL(req.query.snippet, req.query.file);
    if(content){
        res.status(constants.SUCESSFUL).send({
            content: content
        })
    } else {
        res.status(constants.NOT_FOUND).send({
            error: constants.ERROR_MESSAGE
        })
    }
})

app.listen(config.port, () => {
    console.log(constants.PORT_INFO,config.port)
  });

  