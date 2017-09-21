import models from '../models'
import express from 'express'

const router = express.Router()

router.get('/:deviceId?', async (req, res) => {
	let devices = await models.Devices.findAll({
		where: {
			id: (req.params.deviceId == null) ? '*' : req.params.deviceId
		}
	})
	res.send(devices)
})

router.post('/', async (req, res) => {
	let devices = await models.Devices.create({
		name: req.query.name,
		description: req.query.description,
		address: req.query.address
	})
	.error(() => {
		res.sendStatus(500)
	})
	res.sendStatus(201)
})

router.patch('/:deviceId', async (req, res) => {
	let device = models.Devices.find({
		where: {
			id: req.query.deviceId
		}
	})
	.error((err) => {
		res.sendStatus(500)
	})

	if (!device) {
		res.sendStatus(404)
		return
	}
	device.name = req.query.name || device.name
	device.description = req.query.description || device.description
	device.address = req.query.address || device.address
	await device.save()
	res.sendStatus(202)
})

router.delete('/:deviceId', async (req, res) => {
	await models.Devices.destroy({
		where: {
			id: req.params.deviceId
		}
	})
	.error(() => {
		res.sendStatus(500)
	})

	res.sendStatus(202)
})

module.exports = router
