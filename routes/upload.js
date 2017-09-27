import models from '../models'
import express from 'express'
import fileupload from 'express-fileupload'
import fs from 'fs'
import { USER_FILE_STORAGE_PATH } from '../config'

const router = express.Router()

let getAssetTypeFromMimeType = async (mimetype) => {
	try {
		let asset = await models.AssetTypes.findOne({
			where: {
				mime: mimetype
			}
		})
		console.log(asset)
		return asset
	} catch (err) {
		console.log('Error getting asset type from mimetype: ' + err)
		return null
	}
}

router.post('/:showId', async (req, res) => {
	console.log('got an upload request')
	if (!req.files) {
		// there are no files
		console.log('no files in upload request')
		res.sendStatus(400)
		return
	}

	let assetFile = req.files.assetFile
	let assetType = await getAssetTypeFromMimeType(assetFile.mimetype)
	console.log('assetType: ' + assetType)

	// make sure that the directory exists
	let assetDirectory = `${USER_FILE_STORAGE_PATH}/${req.params.showId}/${assetType.dataValues.id}`
	if (!fs.existsSync(USER_FILE_STORAGE_PATH)) {
		fs.mkdirSync(USER_FILE_STORAGE_PATH)
	}
	if (!fs.existsSync(`${USER_FILE_STORAGE_PATH}/${req.params.showId}`)) {
		fs.mkdirSync(`${USER_FILE_STORAGE_PATH}/${req.params.showId}`)
	}
	if (!fs.existsSync(assetDirectory)) {
		fs.mkdirSync(assetDirectory)
	}

	let assetPath = `${assetDirectory}/${assetFile.name}`

	console.log('moving asset file')
	assetFile.mv(assetPath, (err) => { // move the file on the server
		if (err) {
			console.log('error moving file')
			res.sendStatus(500)
			console.log(`Error moving user file ${err}`)
			return
		} else {
			console.log('moved file')
			models.Assets.create({
				name: assetFile.name,
				path: assetPath,
				showId: req.params.showId,
				assetTypeId: assetType.dataValues.id
			})
			.then(() => {
				console.log('inserted record into asset')
				res.sendStatus(200)
				return
			})
			.error(() => {
				console.log('error inserting record into asset')
				res.sendStatus(500)
				return
			})
		}
	})
	return
})

module.exports = router
