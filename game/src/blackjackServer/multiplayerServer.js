const path_ = require('path')
const http_ = require('http')
const express_ = require('express')
const socketio_ = require('socket.io')

const app_ = express_()
const server_ = http_.createServer(app_)
const io_ = socketio_(server_)

const port_ = process.env.port_ || 5000
const publicDirectoryPath_ = path_.join(__dirname, '../public')

app_.use(express_.static(publicDirectoryPath_))


server_.listen(port_, () => {
    console.log(`BJServer is up on port ${port_}`)
})