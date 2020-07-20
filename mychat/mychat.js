const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/mychat.html')
})

var users = ['arifin', 'paijo']
io.on('connection', (socket) => {
    console.log('a user are connected')
    socket.emit('userList', users)
})

http.listen(3000, () => {
    console.log('listening from 3000')
})