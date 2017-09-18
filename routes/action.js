import models from '../models'
import express from 'express'

const router = express.Router()

router.get('/:actionId?', (req, res) => {
	models.Actions.findAll({
		where: {
			id: (req.params.actionId == null) ? '*' : req.params.actionId
		}
	})
	.then((action) => {
		console.log('req')
		res.send(action)
	})
})

router.post('/', (req, res) => {
	models.Actions.create({
		address: req.query.address,
		duration: req.query.duration,
		name: req.query.name,
		description: req.query.description
	})
	.then((action) => {
		res.sendStatus(201)
	})
	.error(() => {
		res.sendStatus(500)
	})
})

router.patch('/:actionId', (req, res) => {
	models.Actions.find({
		where: {
			id: req.params.actionId
		}
	})
	.then((action) => {
		if (!action) {
			res.sendStatus(404)
			return
		}
		action.address = req.query.address || action.address
		action.duration = req.query.duration || action.duration
		action.name = req.query.name || action.name
		action.description = req.query.description || action.description
	})
	.error((err) => {
		res.sendStatus(500)
	})
})

router.delete('/:actionId', (req, res) => {
	models.Actions.destroy({
		where: {
			id: req.params.actionId
		}
	})
	.then(() => {
		res.sendStatus(202)
	})
	.error(() => {
		res.sendStatus(500)
	})
})

module.exports = router
