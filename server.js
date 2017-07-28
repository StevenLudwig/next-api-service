const restify = require('restify');
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');
const settings = require('./settings');
const ModelComputer = require('./models/computer');
const server = restify.createServer({
	name: 'api-next',
	version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser({ mapParams: true }));
server.use(restify.plugins.urlEncodedBodyParser({ mapParams: true }));
server.use(cors());
/* server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); */

const api_version = "v2";

server.get('/', (req, res) => {
	return res.send(200, { name: server.name });
});


server.get(api_version.concat('/computers'), (req, res) => {
	ModelComputer.find({}, (error, computers) => {
		if (error) return res.send(500, error);
		return res.send(200, computers);
	});
});

server.post(api_version.concat('/computers'), (req, res) => {
	const data = req.body;
	if (!data) return res.send(400, { error: "no data" });
	console.log("ths data",data);

	const AddComputer = new ModelComputer(data);
	AddComputer.save((error, computer) => {
		if (error) return res.status(500, error);
		return res.send(201, computer);
	});
});


server.listen(5005, () => {
	console.log('%s listening at %s', server.name, server.url);

	mongoose.connection.on('error', (error) => {
		console.log(error);
		process.exit(1);
	});

	global.db = mongoose.connect(settings.MONGO.URI, {
		useMongoClient: true
	});
});