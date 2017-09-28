import request from 'supertest'
import app from '../app'

describe('Test /shows route', () => {
	test('It should respond to GET', async () => {
		const response = await request(app).get('/shows')
		expect(response.statusCode).toBe(200)
	}),

	test('It should respond to POST', async () => {
		const response = await request(app)
			.post('/shows')
			.query({
				name: 'Test show',
				director: 'Elijah'
			})
		expect(response.statusCode).toBe(201)
	})

})
