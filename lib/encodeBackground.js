import { app } from '../app'
import encodeMedia from './encodeMedia'
import fs from 'fs'

export default function encodeBackgroud(action) {

	console.log(action.dataValues.Asset)

	let json = {}
	json.media = `rgb(${action.dataValues.Asset.dataValues.redValue},${action.dataValues.Asset.dataValues.greenValue},${action.dataValues.Asset.dataValues.blueValue})`
	json.action = 'background'
	json.sound_bool = false
	json.vibrate_bool = false
	json.vibrate_length = 0
	json.asset = ''

	return JSON.stringify(json)
}
