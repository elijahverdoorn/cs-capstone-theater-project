import app from './app'
import express from 'express'
import {PORT} from './config'

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})
