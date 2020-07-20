const app = require('http').createServer(handler)
const io = require('socket.io')(app)
const fs = require('fs')

app.listen(3000)

function handler(req, res) {
    fs.readFile(__dirname + '/usingHttp.html', (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('error loading usingHttp.html')
        }
        res.writeHead(200)
        res.end(data)
    })
}

io.on('connection', (socket) => {
    socket.emit('news', {
        hello: 'world'
    })
    socket.on('my other event', (data) => {
        console.log(data)
    })
})