/* broandcast adalah mengirim sebuah pesan untuk semua client yang terkoneksi

broadcast dapat di lakukan di banyak tingkatan yaitu

- untuk semua client yang terkoneksi
- untuk client di sebuah namespace
- untuk client di room tertentu
*/

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/broadcast.html')
})

// event untuk broadcast ke semua client yang terkoneksi kita bisa gunakan io.sockets.emit
var clients = 0;
io.on('connection', (socket) => {
    clients++
    io.sockets.emit('broadcast', {
        description: clients + ' client connected!'
    })
    socket.on('disconnect', function () {
        clients--
        io.sockets.emit('broadcast', {
            description: clients + ' clients connected'
        })
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000')
})