import models from '../models'
import express from 'express'

const router = express.Router()

router.get('/:actionId?', async (req, res) => {
	let actions = await models.Actions.findAll({
		where: {
			id: (req.params.actionId == null) ? '*' : req.params.actionId
		}
	})
	res.send(actions)
})

router.post('/', async (req, res) => {
	let actions = await models.Actions.create({
		address: req.query.address,
		duration: req.query.duration,
		name: req.query.name,
		description: req.query.description
	})
	.error(() => {
		res.sendStatus(500)
	})
	res.sendStatus(201)
})

router.patch('/:actionId', async (req, res) => {
	let action = models.Actions.find({
		where: {
			id: req.params.actionId
		}
	})
	.error((err) => {
		res.sendStatus(500)
	})

	if (!action) {
		res.sendStatus(404)
		return
	}
	action.address = req.query.address || action.address
	action.duration = req.query.duration || action.duration
	action.name = req.query.name || action.name
	action.description = req.query.description || action.description
	await action.save()
	res.sendStatus(202)
})

router.delete('/:actionId', async (req, res) => {
	await models.Actions.destroy({
		where: {
			id: req.params.actionId
		}
	})
	.error(() => {
		res.sendStatus(500)
	})

	res.sendStatus(202)
})

module.exports = router
