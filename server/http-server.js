const http = require('http')
const fs = require('fs')

const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))

console.log('server is listening on :5678...')

http.createServer(function (req, res) {
    console.log("Some client requested data...")
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(data))
}).listen(5678)