const express = require('express');
const ModelComputer = require('./models/computer');
const router = express.Router();

router.get('/', (req, res) => {
	return res.status(200).send('ok');
});

router.get('/computers', (req, res) => {
	ModelComputer.find({}, (error, computers) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(computers);
	});
});

router.get('/computers/:computer_id', (req, res) => {
	const { computer_id } = req.params;

	ModelComputer.findOne({ _id: computer_id }, (error, computer) => {
		if (error) return res.status(500).send(error);
		return res.status(200).send(computer);
	});
});

router.post('/computers',(req, res) => {
	const data = req.body;
	if (!data) return res.send(400, { error: "no data" });

	const AddComputer = new ModelComputer(data);
	AddComputer.save((error, saved) => {
		if (error) return res.send(500);
		return res.status(201).send(saved);
	});
});

module.exports = router;