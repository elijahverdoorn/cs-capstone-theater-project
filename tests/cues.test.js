import request from 'supertest'
import app from '../app'
import models from '../models'

describe('Test /cues route', () => {

	const cueName = 'test cue'
	const cueDescription = 'test description'
	const cueSequenceNum = 1
	const cueId = 1

	// run once, before any test in this test block is run.
	// use this to set up the testing environment
	beforeAll(async () => {
		// clear the database table
		await models.Cues.destroy({
			where: {}
		})
		// make sure that it has at least one row
		return models.Cues.create({
			id: cueId,
			name: cueName,
			description: cueDescription,
			sequenceNum: cueSequenceNum
		})
	})

	test('It should respond 200 to GET', async () => {
		const response = await request(app).get('/cues')
		expect(response.statusCode).toBe(200)
	}),

	test('It should respond to GET with JSON', async () => {
		const response = await request(app).get('/cues')
		expect(response.body[0].id).toBe(1)
	}),

	test('It should respond 201 to POST', async () => {
		const newCueName = 'new cue'
		const newCueDescription = 'newCueDescription'
		const response = await request(app)
			.post('/cues')
			.query({
				name: newCueName,
				description: newCueDescription,
				sequenceNum: cueSequenceNum
			})
		expect(response.statusCode).toBe(201)
	})

	test('It should insert a record on POST', async () => {
		const newCueName = 'new cue 2'
		const newCueDescription = 'newCueDescription'

		const response = await request(app)
			.post('/cues')
			.query({
				name: newCueName,
				description: newCueDescription,
				sequenceNum: cueSequenceNum
			})
		const newQuery = await models.Cues.findOne({
			where: {
				name: newCueName
			}
		})
		expect(newQuery.dataValues.name).toBe(newCueName)
		expect(newQuery.dataValues.description).toBe(newCueDescription)
		expect(newQuery.dataValues.sequenceNum).toBe(cueSequenceNum)
	})

	test('It should respond 202 to PATCH', async () => {
		const newCueName = 'another name'
		const response = await request(app)
			.patch('/cues/' + cueId)
			.query({
				name: newCueName
			})

		expect(response.statusCode).toBe(202)
	})

	test('It should update a record on PATCH', async () => {
		const newCueName = 'another name 2'
		const response = await request(app)
			.patch('/cues/' + cueId)
			.query({
				name: newCueName
			})

		const data = await models.Cues.findById(cueId)
		expect(data.dataValues.name).toBe(newCueName)
	})


	test('It should respond 202 to DELETE', async () => {
		const response = await request(app)
			.delete('/cues/' + cueId)
		expect(response.statusCode).toBe(202)
	})

	test('It should delete a record on DELETE', async () => {
		await models.Cues.create({
			id: cueId,
			name: cueName,
			description: cueDescription,
			sequenceNum: cueSequenceNum
		})
		const response = await request(app)
			.delete('/Cues/' + cueId)
		let record = models.Cues.findAll({
			where: {
				id: cueId
			}
		})

		expect(record.dataValues).toBeUndefined()
	})
})
