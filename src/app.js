const express = require('express');
const cors = require('cors');
const app = express();

const Gif = require('./models/Gif');

app.use(cors());
app.use(express.json());

const db = require('./db');

app.get('/gifs', async (req, res) => {
	try {
		const allGifs = await Gif.getAll();

		return res.json(allGifs.rows);
	} catch (e) {
		console.error(e);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.get('/gifs/:gifId', async (req, res) => {
	try {
		const gif = await Gif.getByGiphyId(req.params.gifId);
		console.log('/gifs/:gifId', gif);

		return res.json(gif);
	} catch (e) {
		console.error(e);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.post('/gifs', async (req, res) => {
	try {
		const { data } = req.body;
		console.log('data', data);

		const newGif = await Gif.create(data.id, data.url, data.user.username);
		return res.status(201).json(newGif);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Unable to add to database' });
	}
});

app.post('/gifs/:giphyId/up', async (req, res) => {
	try {
		console.log('in upvote route');
		let giphyId = req.params.giphyId;
		console.log(giphyId);

		// const exists = await Gif.getByGiphyId(giphyId);

		// // if (!exists[0]) {
		// // 	return res.redirect(`/gifs/${giphyId}`)

		// // }

		const result = await Gif.raiseCount(giphyId);
		console.debug(result);
		return res.json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.post('/gifs/:giphyId/down', async (req, res) => {
	try {
		console.log('in downvote route');
		let giphyId = req.params.giphyId;
		console.log(giphyId);

		const result = await Gif.lowerCount(giphyId);
		console.log(result);

		return res.json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = app;
