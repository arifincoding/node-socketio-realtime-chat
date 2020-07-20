const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(4000)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/usingExpress.html')
})

io.on('connection', (socket) => {
    socket.emit('news', {
        hello: 'world'
    })
    // public message
    socket.on('my other event', (data) => {
        console.log(data)
    })
    // private message
    socket.on('private message', (from, msg) => {
        console.log('I received a private message by ', from, 'saying', msg)
    })
})