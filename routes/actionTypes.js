import models from '../models'
import express from 'express'

const router = express.Router()

router.get('/:actionTypeId?', async (req, res) => {
	if (req.params && req.params.actionTypeId) {
		let actions = await models.ActionTypes.findAll({
			where: {
				id: req.params.actionTypeId
			}
		})
		res.send(actions)
	} else {
		let actions = await models.ActionTypes.findAll()
		res.send(actions)
	}
})

router.post('/', async (req, res) => {
	let actionTypes = await models.ActionTypes.create({
		name: req.query.name
	})
	.error(() => {
		res.sendStatus(500)
	})
	res.sendStatus(201)
})

router.patch('/:actionTypeId', async (req, res) => {
	let actionType = models.ActionTypes.find({
		where: {
			id: req.query.actionTypeId
		}
	})
	.error((err) => {
		res.sendStatus(500)
	})

	if (!actionType) {
		res.sendStatus(404)
		return
	}
	actionType.name = req.query.name || actionType.name
	await actionType.save()
	res.sendStatus(202)
})

router.delete('/:actionTypeId', async (req, res) => {
	await models.ActionTypes.destroy({
		where: {
			id: req.params.actionTypeId
		}
	})
	.error(() => {
		res.sendStatus(500)
	})

	res.sendStatus(202)
})

module.exports = router
