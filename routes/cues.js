import models from '../models'
import express from 'express'

const router = express.Router()

router.get('/:cueId?', async (req, res) => {
	let cues = await models.Cues.findAll({
		where: {
			id: (req.params.cueId == null) ? '*' : req.params.cueId
		}
	})
	res.send(cues)
})

router.post('/', async (req, res) => {
	let cues = await models.Cues.create({
		name: req.query.name,
		description: req.query.description,
		sequenceNum: req.query.sequenceNum
	})
	.error(() => {
		res.sendStatus(500)
	})
	res.sendStatus(201)
})

router.patch('/:cueId', async (req, res) => {
	let cue = models.Cues.find({
		where: {
			id: req.query.cueId
		}
	})
	.error((err) => {
		res.sendStatus(500)
	})

	if (!cue) {
		res.sendStatus(404)
		return
	}
	cue.name = req.query.name || cue.name
	cue.description = req.query.description || cue.description
	cue.sequenceNum = req.query.sequenceNum || cue.sequenceNum
	await cue.save()
	res.sendStatus(202)
})

router.delete('/:cueId', async (req, res) => {
	await models.Cues.destroy({
		where: {
			id: req.params.cueId
		}
	})
	.error(() => {
		res.sendStatus(500)
	})

	res.sendStatus(202)
})

module.exports = router
