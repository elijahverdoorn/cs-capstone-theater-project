import models from '../models'
import express from 'express'
import fileupload from 'express-fileupload'
import { USER_FILE_STORAGE_PATH } from '../config'

const router = express.Router()

function getAssetTypeFromMimeType(mimetype) {
	models.AssetType.findOne({
		where: {
			mime: mimetype
		}
	})
	.then((asset) => {
		return asset
	})
	.error(() => {
		console.log('Error getting asset type from mimetype: ' + err)
		return null
	})
}

router.post('/', (req, res) => {
	if (!req.files) {
		// there are no files
		res.sendStatus(400)
		return
	}

	let assetFile = req.files.assetFile
	let assetType = getAssetTypeFromMimeType(assetFile.mimetype)
	let assetPath = `${USER_FILE_STORAGE_PATH}/${req.params.showId}/${assetType.dataValues.id}/${assetFile.name}`

	assetFile.mv(assetPath, (err) => { // move the file on the server
		if (err) {
			res.sendStatus(500)
			console.log(`Error moving user file ${err}`)
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
				return
			})
			.error(() => {
				res.sendStatus(500)
				return
			})
		}
	})
	return
})

module.exports = router
