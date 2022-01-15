const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const FILTER = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/message')
const { addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.port || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', ({username, room}, callback) => {
        const {error, user} = addUser({id: socket.id , username, room})

        if(error){
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Server', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Server', `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })


        callback()
    })

    socket.on('sendMessage', (message, callback) =>{
        const user = getUser(socket.id)

        const filter = new FILTER()

        if(filter.isProfane(message)) {
            return callback('Profanity is not alllowed!')
        }

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback('Delivered')
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user) {
            io.to(user.room).emit('message', generateMessage('Server', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })



})

server.listen(port, () => {
    console.log(`Server is up on Port ${port}!`)
})

