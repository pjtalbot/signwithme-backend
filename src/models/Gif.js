const db = require('../db');
const ExpressError = require('../ExpressError');

class Gif {
	constructor(giphyId, url, count, creator) {
		(this.giphyId = giphyId), (this.url = url), (this.count = count), (this.creator = creator);
	}

	static async create(giphyId, url, creator) {
		try {
			const result = await db.query(
				`INSERT INTO gifs (giphy_id, url, count, creator)
                VALUES ($1, $2, $3, $4)
                RETURNING id, giphy_id, url, creator`,
				[ giphyId, url, 1, creator ]
			);

			return result.rows[0];
		} catch (e) {
			console.log(e);
		}
	}

	static async getAll() {
		try {
			const result = db.query(`
            SELECT * FROM gifs
            `);
			return result;
		} catch (e) {
			console.log(e);
		}
	}

	static async getByGiphyId(giphyId) {
		try {
			let result = await db.query(`SELECT * FROM gifs WHERE giphy_id = $1`, [ giphyId ]);

			if (result.rowCount === 0) {
				console.log('No Gif with such Id');
				console.log(result.rows);
			}

			return result.rows;
		} catch (e) {
			console.log(e);
		}
	}

	static async raiseCount(giphyId) {
		try {
			let result = await db.query(
				`UPDATE gifs
            SET count = count + 1
            WHERE giphy_id = $1
            returning giphy_id, count`,
				[ giphyId ]
			);

			console.log('line58', result);

			return result.rows[0];
		} catch (e) {
			console.log(e);
		}
	}

	static async lowerCount(giphyId) {
		try {
			let result = await db.query(
				`UPDATE gifs
            SET count = count - 1
            WHERE giphy_id = $1
            returning giphy_id, count`,
				[ giphyId ]
			);

			// if (result.rows[0].count === 0) {
			// 	console.log('count is at 0');
			// 	await db.query(
			// 		`DELETE FROM gifs
			// 	WHERE giphy_id = $1
			// 	returning giphy_id`,
			// 		[ giphyId ]
			// 	);

			// 	let response = { message: `Gif removed from database. Giphy Id: ${giphyId}`, status: 202 };
			// 	return response;
			// }
			console.log('line88', result);

			return result.rows[0];
		} catch (e) {
			console.log(e);
		}
	}

	static async getAllByTopCount() {
		try {
			let result = await db.query(`SELECT * FROM gifs ORDER BY count DESC`);

			return result;
		} catch (e) {}
	}

	static async delete(giphyId) {
		try {
			let result = await db.query(`DELETE FROM gifs WHERE giphy_id = $1 returning giphy_id`, [ giphyId ]);

			result.rows[0].message = `Giphy Id: ${giphyId} deleted from database`;

			return result.rows[0];
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Gif;
