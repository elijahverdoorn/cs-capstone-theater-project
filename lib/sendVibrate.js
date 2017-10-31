import { app } from '../app'
import encodeMedia from './encodeMedia'
import fs from 'fs'

export default function sendVibrate(action) {
	let json = {}
	json.action = 'vibration'
	json.sound_bool = false
	json.vibrate_bool = true
	json.vibrate_length = (action.dataValues.duration * 1000)

	console.log(json)
	app.io.emit('json emission', JSON.stringify(json))
}
