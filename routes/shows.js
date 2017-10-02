import models from '../models'
import express from 'express'

const router = express.Router()

router.get('/:showId?', async (req, res) => {
	if (res.params && res.params.showId) {
		let shows = await models.Shows.findAll({
			where: {
				id: req.params.showId
			}
		})
		res.send(shows)
	} else {
		let shows = await models.Shows.findAll()
		res.send(shows)
	}
})

router.post('/', async (req, res) => {
	let shows = await models.Shows.create({
		name: req.query.name,
		director: req.query.director
	})
	.error(() => {
		res.sendStatus(500)
	})
	res.sendStatus(201)
})

router.patch('/:showId', async (req, res) => {
	let show = await models.Shows.find({
		where: {
			id: req.params.showId
		}
	})
	.error((err) => {
		res.sendStatus(500)
	})

	if (!show) {
		res.sendStatus(404)
		return
	}
	show.name = req.query.name || show.name
	show.director = req.query.director || show.director
	await show.save()
	res.sendStatus(202)
})

router.delete('/:showId', async (req, res) => {
	await models.Shows.destroy({
		where: {
			id: req.params.showId
		}
	})
	.error(() => {
		res.sendStatus(500)
	})

	res.sendStatus(202)
})

module.exports = router
