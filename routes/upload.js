import models from '../models'
import express from 'express'
import fileupload from 'express-fileupload'
import {USER_FILE_STORAGE_PATH} from '../config'

const router = express.Router()

let getAssetTypeFromMimeType = async (mimetype) => {
	let asset
	try {
		asset = await models.AssetType.findOne({
			where: {
				mime: mimetype
			}
		})
	} catch (err) {
		console.log('Error getting asset type from mimetype: ' + err)
		return null
	}

	return asset
}

router.post('/', async (req, res) => {
	if (!req.files) {
		// there are no files
		res.sendStatus(400)
	}

	let assetFile = req.files.assetFile
	let assetType = await getAssetTypeFromMimeType(assetFile.mimetype)
	let assetPath = `${USER_FILE_STORAGE_PATH}/${req.params.showId}/${assetType.dataValues.id}/${assetFile.name}`
	assetFile.mv(assetPath, (err) => { // move the file on the server
		if (err) {
			res.sendStatus(500)
			console.log(`Error moving user's file ${err}`)
			return
		} else {
			models.AssetType.create({
				name: assetFile.name,
				path: assetPath,
				showId: req.params.showId,
				assetTypeId: assetType.dataValues.id
			})
			.then(() => {
				res.sendStatus(200)
			})
			.error(() => {
				res.sendStatus(500)
			})
		}
	})
})
