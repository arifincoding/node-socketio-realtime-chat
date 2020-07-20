const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/namespace.html')
})
const chat = io.of('/chat')
chat.on('connection', (socket) => {
    chat.emit('asw', {
        that: 'only'
    })
})

server.listen(3000)