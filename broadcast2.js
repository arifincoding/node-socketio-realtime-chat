var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/broadcast2.html')
})

var client = 0
io.on('connection', function (socket) {
    client++
    // hanya muncul pada client yang baru connect saja
    socket.emit('newclientconnect', {
        description: 'hey,welcome!'
    })
    // client lama akan muncul dibawah
    socket.broadcast.emit('newclientconnect', {
        description: client + ' client connected'
    })
    socket.on('disconnect', function () {
        client--
        socket.broadcast.emit('newclientconnect', {
            description: client + ' client connected'
        })
    })
})

http.listen(3000, function () {
    console.log('listening on 3000')
})