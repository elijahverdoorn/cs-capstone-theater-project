import { app } from '../app'
import encodeMedia from './encodeMedia'
import fs from 'fs'

export default function sendImage(query, socketId) {
	let filePath
	let mimeType
	if (query.Asset) {
		filePath = query.Asset.dataValues.path
		mimeType = query.Asset.dataValues.AssetType.dataValues.mime
	} else {
		filePath = query.dataValues.path
		mimeType = query.dataValues.AssetType.dataValues.mime
	}

	// get the file from storage
	let imageBinary = fs.readFileSync(filePath)
	let imageString = new Buffer(imageBinary).toString('base64')
	imageString = `data:${mimeType};base64,${imageString}` // this is the format that React Native wants
	let json = {}
	json.media = imageString
	json.mime = mimeType
	json.action = 'image'
	json.sound_bool = false
	json.vibrate_bool = false
	json.vibrate_length = 0

	if (socketId) {
		// there is a socketId with this image, so we should only send it to that Id.
		// used for the splash screen functions
		app.io.to(socketId).emit('json emission', JSON.stringify(json))
	} else {
		// no Id with this image, so send it to all the clients that are connected right now.
		app.io.emit('json emission', JSON.stringify(json))
	}
}
