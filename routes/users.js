import models from '../models'
import express from 'express'

const router = express.Router()

router.get('/:userId?', async (req, res) => {
	if (req.params && req.params.userId) {
		let users = await models.Users.findAll({
			where: {
				id: req.params.userId
			}
		})
		res.send(users)
	} else {
		let users = await models.Users.findAll()
		res.send(users)
	}
})

router.post('/', async (req, res) => {
	let users = await models.Users.create({
		deviceType: req.query.deviceType,
		isAdmin: req.query.isAdmin,
		seat: req.query.seat,
		ipAddress: req.query.ipAddress
	})
	.error(() => {
		res.sendStatus(500)
	})
	res.sendStatus(201)
})

router.patch('/:userId', async (req, res) => {
	let user = models.Users.find({
		where: {
			id: req.query.userId
		}
	})
	.error((err) => {
		res.sendStatus(500)
	})

	if (!user) {
		res.sendStatus(404)
		return
	}
	user.deviceType = req.query.deviceType || user.deviceType
	user.isAdmin = req.query.isAdmin || user.isAdmin
	user.seat = req.query.seat || user.seat
	user.ipAddress = req.query.ipAddress || user.ipAddress
	await user.save()
	res.sendStatus(202)
})

router.delete('/:userId', async (req, res) => {
	await models.Users.destroy({
		where: {
			id: req.params.userId
		}
	})
	.error(() => {
		res.sendStatus(500)
	})

	res.sendStatus(202)
})

module.exports = router
