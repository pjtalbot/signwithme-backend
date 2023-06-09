process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('./app');
const db = require('./db');

const Gif = require('./models/Gif');

let testGif1 = {
	data: {
		id: 'gif1',
		url: 'testurl.com',
		user: 'signWithRobert'
	}
};

let testGif2 = {
	data: {
		id: 'gif2',
		url: 'testurl.com',
		user: 'signWithRobert'
	}
};

beforeAll(async () => {
	let result1 = await Gif.create(testGif1.data.id, testGif1.data.url, testGif1.data.user);
	console.log(result1);
	await Gif.create(testGif2.data.id, testGif2.data.url, testGif2.data.user);
});

describe('Test API routes', () => {
	it('should return all gifs', async () => {
		const response = await request(app).get('/gifs');
		console.log(response.statusCode);
		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(2);
	});

	it('should create a new gif', async () => {
		const response = await request(app).post('/gifs').send({
			data: {
				id: 'gifId',
				url: 'gifUrl',
				user: { username: 'username' }
			}
		});
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('id');
		expect(response.body.giphy_id).toBe('gifId');
	});

	it('should increment the count for a gif', async () => {
		const response = await request(app).post('/gifs/gifId/up');
		expect(response.status).toBe(200);
		expect(response.body.count).toBe(2);
	});

	it('should decrement the count for a gif', async () => {
		const response = await request(app).post('/gifs/gifId/down');
		expect(response.status).toBe(200);
		expect(response.body.count).toBe(1);
	});

	it('should remove gif from database when favorite count is 0', async () => {
		const response = await request(app).post('/gifs/gifId/down');
		console.log(response);
		expect(response.status).toBe(202);
	});
});

afterAll(async () => {
	await db.query(`DELETE FROM gifs`);
	await db.end();
});
