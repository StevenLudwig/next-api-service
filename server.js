const restify = require('restify');
const cors = require('cors');
const morgan  = require('morgan');
const mongoose = require('mongoose');
const settings = require('./settings');
const ModelComputer = require('./models/computer');
const server = restify.createServer({
	name: 'api-next',
	version: '1.0.0'
});

server.pre(restify.pre.userAgentConnection());

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(morgan('combined'));
server.use(cors({
	allowedHeaders: 'Origin, Accept, Content-Type',
	origin: '*',
	methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD'
}));
server.use((req, res, next) => {
	res.charSet('utf-8');
	if (req.method == 'POST' && req.body) {
		req.body = JSON.parse(req.body);
	};
	return next();
});

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

	const AddComputer = new ModelComputer(data);
	AddComputer.save((error, saved) => {
		if (error) return res.send(500);
		return res.send(201, saved);
	});
});


server.listen(5005, () => {
	console.log('%s listening at %s', server.name, server.url);

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