const express = require('express');
const settings = require('./settings');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan  = require('morgan');

const bodyParser = require('body-parser');
const server = express();
const routes = require('./routes');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan('combined'));
server.use(cors());

const api_version = "/v2";
server.use(api_version, routes);

server.get('/', (req, res) => {
	return res.status(200).send({ message: 'ok' });
});

server.listen(5005, () => {
	console.log('http://localhost:5005');

	mongoose.connection.on('error', (error) => {
		console.log(error);
		process.exit(1);
	});

	mongoose.Promise = Promise;
	global.db = mongoose.connect(settings.MONGO.URI, {
		useMongoClient: true,
		promiseLibrary: require('bluebird')
	});
});