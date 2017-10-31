import { app } from '../app'
import encodeMedia from './encodeMedia'
import fs from 'fs'

export default function sendAudio(action) {
	let filePath = action.Asset.dataValues.path
	let mimeType = action.Asset.dataValues.AssetType.dataValues.mime

	// get the file from storage
	let audio = fs.readFileSync(filePath)
	let audioString = new Buffer(audio).toString('base64')
	audioString = `data:${mimeType};base64,${audioString}` // this is the format that React Native wants
	let json = {}
	json.media = audioString
	json.mime = mimeType
	json.action = 'audio'
	json.sound_bool = true
	json.vibrate_bool = false
	json.vibrate_length = 0

	console.log(json)
	app.io.emit('json emission', JSON.stringify(json))
}

