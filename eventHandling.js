/* list event untuk server
- connect
- message
- disconnect
- reconnect
- ping
- join
- leave
*/

/* list event untuk client
- connect
- connect_error
- connect_timeout
- reconnect
*/

var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/eventHandling.html')
})

io.on('connection', function (socket) {
    console.log('a user connected')

    // send a message after a timeout of 4 seconds
    setTimeout(function () {
        // build in event 
        // tidak direkomendasikan
        socket.send('Send a message 4 seconds after connection!')
    }, 4000)

    // send a message after a timeout of 4 seconds
    setTimeout(function () {
        // custom event
        // sending an object when emmiting an event
        socket.emit('testerEvent', {
            description: 'a custom event named testerEvent'
        })
    }, 4000)

    socket.on('clientEvent', function (data) {
        console.log(data)
    })
    socket.on('disconnect', function () {
        console.log('A user disconnected')
    })
})

http.listen(3000, function () {
    console.log('listening on 3000')
})