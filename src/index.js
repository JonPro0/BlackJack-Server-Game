const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const FILTER = require('bad-words')
const { generateMessage } = require('./utils/message')
const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
} = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit(
            'message',
            generateMessage('Server', 'Willkommen bei Zelle`s BlackJack!')
        )
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                generateMessage(
                    'Server',
                    `${user.username} ist dem Raum beigetreten!`
                )
            )
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room),
        })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        const filter = new FILTER()

        if (filter.isProfane(message)) {
            return callback('Es sind keine Schimpfwörter erlaubt!')
        }

        io.to(user.room).emit(
            'message',
            generateMessage(user.username, message)
        )
        callback('Zugestellt')
    })

    socket.on('startGame1', () => {
        const user = getUser(socket.id)
        io.to(user.room).emit('startGame')
    })

    socket.on('hit1', (card) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('hit', {card, user})
    })

    socket.on('stay1', ({dealerCard, dealerCard2, dealerCard3, dealerCard4, dealerCard5, dealerCard6}) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('stay', {dealerCard, dealerCard2, dealerCard3, dealerCard4, dealerCard5, dealerCard6})
    })

    socket.on('bePlayer1_1', () => {
        const user = getUser(socket.id)
        io.to(user.room).emit('bePlayer1', user.username)
    })

    socket.on('bePlayer2_1', () => {
        const user = getUser(socket.id)
        io.to(user.room).emit('bePlayer2', user.username)
    })

    socket.on('bePlayer3_1', () => {
        const user = getUser(socket.id)
        io.to(user.room).emit('bePlayer3', user.username)
    })

    socket.on('bePlayer4_1', () => {
        const user = getUser(socket.id)
        io.to(user.room).emit('bePlayer4', user.username)
    })

    socket.on('resetPlayer_1', () => {
        const user = getUser(socket.id)
        io.to(user.room).emit('resetPlayer')
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit(
                'message',
                generateMessage(
                    'Server',
                    `${user.username} hat den Raum verlassen!`
                )
            )
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room),
            })
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on Port ${port}!`)
})
