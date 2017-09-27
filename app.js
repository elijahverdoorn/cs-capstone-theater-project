import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import models from './models'
import moment from 'moment'
import fileupload from 'express-fileupload'
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
app.use('/plays', routes.play)
app.use('/actions', actions)
app.use('/actiontypes', routes.actionType)
app.use('/cues', routes.cue)
app.use('/devices', routes.device)
app.use('/shows', routes.show)
app.use('/users', routes.user)
app.use('/uploads', routes.upload)

// API routes
app.use('/play', routes.play)
app.use('/action', actions)
app.use('/actiontype', routes.actionType)
app.use('/cue', routes.cue)
app.use('/device', routes.device)
app.use('/show', routes.show)
app.use('/user', routes.user)
app.use('/upload', routes.upload)

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
