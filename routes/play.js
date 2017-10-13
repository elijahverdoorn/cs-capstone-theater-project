import models from '../models'
import express from 'express'
import encodeMedia from '../lib/encodeMedia'
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
		console.log('cueId: ' + req.params.cueId)
		models.Actions.findAll({
			where: {
				cueId: req.params.cueId
			},
			include: [
				{
					model: models.ActionTypes
				},
				{
					model: models.Assets
				}
			]
		})
		.then((actions) => {
			console.log(actions)
			if (actions) {
				// do stuff with the action
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
