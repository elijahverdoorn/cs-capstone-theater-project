import { app } from '../app'
import encodeMedia from './encodeMedia'
import fs from 'fs'

export default function encodeBackgroud(action, socketId) {
	let json = {}
	json.media = `rgb(${action.dataValues.redValue},${action.dataValues.greenValue},${action.dataValues.blueValue})`
	json.action = 'background'
	json.sound_bool = false
	json.vibrate_bool = false
	json.vibrate_length = 0

	console.log(json)
	app.io.emit('json emission', JSON.stringify(json))
}
