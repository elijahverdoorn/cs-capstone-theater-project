import { app } from '../app'
import encodeMedia from './encodeMedia'
import fs from 'fs'

export default function sendImage(action) {
	let filePath = action.Asset.dataValues.path
	let mimeType = action.Asset.dataValues.AssetType.dataValues.mime

	// get the file from storage
	let imageBinary = fs.readFileSync(filePath)
	let imageString = new Buffer(imageBinary).toString('base64')
	let json = {}
	json.media = imageString
	json.mime = mimeType
	json.action = 'image'
	json.sound_bool = false
	json.vibrate_bool = false
	json.vibrate_length = 0

	// let image = action
	app.io.send(json)
}
