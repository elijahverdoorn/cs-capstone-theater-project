import { app } from '../app'
import encodeMedia from './encodeMedia'
import fs from 'fs'

export default function sendVideo(action) {
	let filePath = action.Asset.dataValues.path
	let mimeType = action.Asset.dataValues.AssetType.dataValues.mime

	// get the file from storage
	let video = fs.readFileSync(filePath)
	let videoString = new Buffer(video).toString('base64')
	videoString = `data:${mimeType};base64,${videoString}` // this is the format that React Native wants
	let json = {}
	json.media = videoString
	json.mime = mimeType
	json.action = 'video'
	json.sound_bool = false
	json.vibrate_bool = false
	json.vibrate_length = 0

	console.log(json)
	app.io.emit('json emission', JSON.stringify(json))
}
