import models from '../models'
import express from 'express'
import encodeMedia from '../lib/encodeMedia'
import actionTypes from '../lib/actionTypes'
import { app } from '../app'
import sendAudio from '../lib/sendAudio'
import sendVideo from '../lib/sendVideo'
import sendImage from '../lib/sendImage'
import sendVibrate from '../lib/sendVibrate'
import sendBackground from '../lib/sendBackground'
const router = express.Router()

/**
 * @api {get} /play/:cueId Execute the actions in a cue
 * @apiName GetPlayCue
 * @apiGroup Play
 *
 * @apiParam {Number} cueId The ID of the cue to be played
 *
 * @apiSuccess 200 The cue was played
 * @apiError 400 The request did not contain a cueId
 * @apiError 404 The cue was not found in the database
 */
router.get('/:cueId', async (req, res) => {

	if (req.params && req.params.cueId) {
		models.Actions.findAll({
			where: {
				cueId: req.params.cueId
			},
			include: [
				{
					model: models.ActionTypes
				},
				{
					model: models.Assets,
					include: [
						{
							model: models.AssetTypes
						}
					]
				}
			]
		})
		.then((actions) => {
			if (actions) {
				// do stuff with the action
				actions.forEach((action) => {
					switch (action.dataValues.ActionTypeId) {
						// do some stuff based on the action type of this action
						case actionTypes.changeBackground:
							console.log('Action type: changeBackground')
							app.io.emit('message', actionTypes.changeBackground)
							break
						case actionTypes.playVideo:
							console.log('Action type: playVideo')
							app.io.emit('message', actionTypes.playVideo)
							break
						case actionTypes.playSound:
							console.log('Action type: playSound')
							app.io.emit('message', actionTypes.playSound)
							break
						case actionTypes.showImage:
							console.log('Action type: show image')
							sendImage(action, null) // send null socketId so that it goes to all clients
							break
						case actionTypes.vibratePhone:
							console.log('Action type: Vibrate Phone')
							app.io.emit('message', actionTypes.vibratePhone)
							break
						default:
							break
					}
				})
				res.sendStatus(200)
			} else {
				res.sendStatus(404)
			}
		})
		.error((err) => {
			console.log(err)
			res.sendStatus(404)
		})
	} else {
		console.log('no cueId')
		res.sendStatus(400)
	}
})

module.exports = router
