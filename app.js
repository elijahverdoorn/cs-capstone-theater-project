import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import models from './models'
import moment from 'moment'
import fileUpload from 'express-fileupload'
import { MAX_FILE_SIZE } from './config'

import actions from './routes/actions'
import upload from './routes/upload'
import actionTypes from './routes/actionTypes'
import cues from './routes/cues'
import devices from './routes/devices'
import shows from './routes/shows'
import users from './routes/users'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// setup the file upload plugin
app.use(fileUpload({
	limits: {
		fileSize: MAX_FILE_SIZE
	},
	safeFileNames: true,
	preserveExtension: true
}))

// Add headers
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
	res.setHeader('Access-Control-Allow-Credentials', true)
	next()
})

// Plural API routes
app.use('/actions', actions)
app.use('/actiontypes', actionTypes)
app.use('/cues', cues)
app.use('/devices', devices)
app.use('/shows', shows)
app.use('/users', users)
app.use('/uploads', upload)

// API routes
app.use('/action', actions)
app.use('/actiontype', actionTypes)
app.use('/cue', cues)
app.use('/device', devices)
app.use('/show', shows)
app.use('/user', users)
app.use('/upload', upload)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
})

module.exports = app

app.listen(4000)
