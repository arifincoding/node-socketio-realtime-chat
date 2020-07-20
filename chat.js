var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/chat.html')
})

user = []
io.on('connection', function (socket) {
    console.log('a user connected')
    socket.on('setUsername', function (data) {
        console.log(data);

        // jika index username baru ada pada variabel user maka muncul error username sudah ada
        if (user.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try some other username')
        } else {
            user.push(data)
            socket.emit('userSet', {
                username: data
            })
        }
    })
    socket.on('msg', function (data) {
        // send message to everyone
        io.sockets.emit('newmsg', data)
    })
})

http.listen(3000, function () {
    console.log('listen on 3000')
})