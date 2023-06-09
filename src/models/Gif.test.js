process.env.NODE_ENV = 'test';

const app = require('../app');
const db = require('../db');

const Gif = require('./Gif.js');

beforeEach(async () => {});

describe('create method', () => {
	it('should return 1', async () => {
		const result = await Gif.create(
			'26xBvcjMlV0ii9I52',
			'https://media1.giphy.com/media/26xBvcjMlV0ii9I52/giphy.gif?cid=4eb69762f3mhr4utabbafq9r9wiypgbv7hzj5l4a9wgc3zxq&ep=v1_gifs_search&rid=giphy.gif&ct=g',
			'signwithrobert'
		);

		console.log(result);
	});
});

describe('getAll method', () => {
	it('should return 1', async () => {
		let result = await Gif.getAll();

		expect(result.rows.length).toBe(1);
	});
});

describe('getByGiphyId method', () => {
	it('should return a gif', async () => {
		const result = await Gif.getByGiphyId('26xBvcjMlV0ii9I52');
		console.log(result);
		expect(result[0].creator).toEqual('signwithrobert');
	});
	it('should return ? if id does not exist', async () => {
		const result = await Gif.getByGiphyId('26xBvcjii9I52');
		console.log(result);
	});
});

describe('raiseCount method', () => {
	it('should initially have a count of 1', async () => {
		const result = await Gif.getByGiphyId('26xBvcjMlV0ii9I52');
		console.log(result);
		expect(result[0].count).toBe(1);
	});
	it('should raise to 2 by calling raiseCount method', async () => {
		const result = await Gif.raiseCount('26xBvcjMlV0ii9I52');
		console.log(result);
		expect(result.count).toBe(2);
	});
});

describe('lowerCount method', () => {
	it('should lower count', async () => {
		await Gif.raiseCount('26xBvcjMlV0ii9I52');
		const result = await Gif.raiseCount('26xBvcjMlV0ii9I52');

		expect(result.count).toBe(4);

		const lowerResult = await Gif.lowerCount('26xBvcjMlV0ii9I52');

		expect(lowerResult.count).toBe(3);
	});
});

describe('getAllByCount method', () => {
	it('should return all gifs', async () => {
		await Gif.create('l0HlNRE6HWecN7tzW', 'https://giphy.com/embed/l0HlNRE6HWecN7tzW', 'signwithrobert');

		let result = await Gif.getAllByTopCount();

		expect(result.rows.length).toBe(2);
		expect(result.rows[0].count).toBe(3);
		expect(result.rows[1].count).toBe(1);
	});
	it('should work with more than 2 gifs', async () => {
		await Gif.create('gif3', 'www', 'signwithrobert');
		await Gif.create('gif4', 'www', 'signwithrobert');

		await Gif.raiseCount('gif3');

		let result = await Gif.getAllByTopCount();

		expect(result.rows.length).toBe(4);
		expect(result.rows[0].count).toBe(3);
		expect(result.rows[1].count).toBe(2);
		expect(result.rows[1].giphy_id).toBe('gif3');
	});
});

describe('delete method', () => {
	it('should delete one gif', async () => {
		let result = await Gif.delete('gif3');

		expect(result.message).toEqual('Giphy Id: gif3 deleted from database');
	});
});

afterAll(async () => {
	await db.query(`DELETE FROM gifs`);
	db.end();
});
