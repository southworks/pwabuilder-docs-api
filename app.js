const app = require('express')()
const config = require('./config')
const port = config.port

app.get('/', function (req, res) {
    res.send('Hello World!')
})

// 404 page not found handler
app.use(function(req, res){
    res.status(404).send("The page doesn't exists. Please check the URL.");
})

app.listen(port, () => console.log(`App listening on port ${port}!`))