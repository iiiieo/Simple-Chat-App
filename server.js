const io = require('socket.io')(3000)
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat_db'
})

const users = {}

addChatMessage('messgegdsafasd', 1, 1)

io.on('connection', socket => {
    console.log('New Connection...');
    socket.emit('chat-msg', 'Du hast den chat betreten...')

    socket.on('chat-msg', message => {
        console.log('Message:', message);
        socket.broadcast.emit('chat-msg', { "message": message, "name": users[socket.id]})
    })
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})

function getUser(id) {

}

function addUser(name) {

}

function addChatMessage(message, userId1, userId2) {
    connection.connect(err => {
        if (err) throw err
        let query = `INSERT INTO messages (user_1, user_2, message) VALUES (${userId1}, ${userId2}, "${message}")`
        connection.query(query, (err, res) => {
            if (err) throw err
            console.log("added one entry")
        })

    })
}