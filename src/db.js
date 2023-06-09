const { Client } = require('pg');

let DB_URI;

if (process.env.NODE_ENV === 'test') {
	console.log('test database');
	DB_URI = 'postgresql:///signwithme_test';
} else if (process.env.NODE_ENV === 'production') {
	DB_URI = process.env.DATABASE_URL;
} else {
	console.log('Dev DataBase');
	DB_URI = 'postgresql:///signwithme_test';
}

let db = new Client({
	connectionString: DB_URI
});

db.connect();

module.exports = db;
