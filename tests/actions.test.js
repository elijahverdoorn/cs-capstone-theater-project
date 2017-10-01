import request from 'supertest'
import app from '../app'
import models from '../models'

describe('Test /actions route', () => {

	const actionName = 'test action'
	const actionDescription = 'test description'
	const actionDuration = 'test duration'
	const actionAddress = 'test address'
	const actionId = 1

	// run once, before any test in this test block is run.
	// use this to set up the testing environment
	beforeAll(async () => {
		// clear the database table
		await models.Actions.destroy({
			where: {}
		})
		// make sure that it has at least one row
		return models.Actions.create({
			id: actionId,
			name: actionName,
			description: actionDescription,
			duration: actionDuration,
			address: actionAddress
		})
	})

	test('It should respond 200 to GET', async () => {
		const response = await request(app).get('/actions')
		expect(response.statusCode).toBe(200)
	}),

	test('It should respond to GET with JSON', async () => {
		const response = await request(app).get('/actions')
		expect(response.body[0].id).toBe(1)
	}),

	test('It should respond 201 to POST', async () => {
		const newActionName = 'new action'
		const newActionDescription = 'newActionDescription'
		const response = await request(app)
			.post('/actions')
			.query({
				name: newActionName,
				description: newActionDescription
			})
		expect(response.statusCode).toBe(201)
	})

	test('It should insert a record on POST', async () => {
		const newActionName = 'new action 2'
		const newActionDescription = 'newActionDescription'

		const response = await request(app)
			.post('/actions')
			.query({
				name: newActionName,
				description: newActionDescription,
			})
		const newQuery = await models.Actions.findOne({
			where: {
				name: newActionName
			}
		})
		expect(newQuery.dataValues.name).toBe(newActionName)
		expect(newQuery.dataValues.description).toBe(newActionDescription)
	})

	test('It should respond 202 to PATCH', async () => {
		const newActionName = 'another name'
		const response = await request(app)
			.patch('/actions/' + actionId)
			.query({
				name: newActionName
			})

		expect(response.statusCode).toBe(202)
	})

	test('It should update a record on PATCH', async () => {
		const newActionName = 'another name 2'
		const response = await request(app)
			.patch('/actions/' + actionId)
			.query({
				name: newActionName
			})

		const data = await models.Actions.findById(actionId)
		expect(data.dataValues.name).toBe(newActionName)
	})


	test('It should respond 202 to DELETE', async () => {
		const response = await request(app)
			.delete('/actions/' + actionId)
		expect(response.statusCode).toBe(202)
	})

	test('It should delete a record on DELETE', async () => {
		await models.Actions.create({
			id: actionId,
			name: actionName,
			description: actionDescription
		})
		const response = await request(app)
			.delete('/Actions/' + actionId)
		let record = models.Actions.findAll({
			where: {
				id: actionId
			}
		})

		expect(record.dataValues).toBeUndefined()
	})
})
