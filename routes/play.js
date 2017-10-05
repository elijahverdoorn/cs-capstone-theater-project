import models from '../models'
import express from 'express'

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
		let actions = models.Actions.findAll({
			where: {
				cueId: req.params.cueId
			}
		})
		.error((err) => {
			console.log(err)
			res.sendStatus(404)
		})
		if (actions) {
			actions.forEach((action) => {
				// do something with the action on the socket
			})
			res.sendStatus(200)
		} else {
			res.sendStatus(404)
			return
		}
	} else {
		res.sendStatus(400)
	}
})

module.exports = router
