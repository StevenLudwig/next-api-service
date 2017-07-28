const mongoose = require('mongoose');
const moment = require('moment');

const ComputerSchema = new mongoose.Schema({
	name: { type: String, trim: true },
	model: { type: String, trim: true },
	serie: { type: String, trim: true },
	price: Number,
	comments: [{
		comment: String,
		date: Date
	}],
	votes: Number,
	created_at: { type: Date, default: moment().toDate() }
}, { minimize: false, versionKey: false });

module.exports = mongoose.model('computer', ComputerSchema);