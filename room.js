var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/room.html')
})

var roomno = 1

io.on('connection', function (socket) {
    // meningkatkan roomno 2 clients yang berada di sebuah room
    if (io.nsps['/'].adapter.rooms["room-" + roomno] && io.nsps['/'].adapter.rooms["room-" + roomno].length > 1) {
        roomno++
    }
    socket.join("room-" + roomno);

    //mengirim event ke semua room
    io.sockets.in("room-" + roomno).emit('connectToRoom', "you are in room no. " + roomno);
})

http.listen(3000, function () {
    console.log('listening on localhost:3000')
})