const express = require('express');
const cors = require('cors');
const app = require('./app');

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`PORT ${port}`);
});
