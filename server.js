import app from './app'
import express from 'express'
import {PORT} from './config'

// set up the server using Node's standard HTTP server so that Socket.io can use it too
let server = require('http').Server(app)
let io = require('socket.io')(server) // give socket.io a reference to the HTTP server
let socketFile = require('./socket.js')(io) // grab the code that defines the socket

server.listen(PORT) // listen with the HTTP server
