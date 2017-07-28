const mongoose = require('mongoose');
const { createdModifiedPlugin } = require('mongoose-createdmodified');

const ComputerSchema = new mongoose.Schema( {
	name: String,
	model: String,
	serie: String,
	price: Number,
	comments: [{
		comment: String,
		date: Date
	}],
	votes: Number
}, { minimize: false, versionKey: false });

ComputerSchema.plugin(createdModifiedPlugin, { index: true })

module.exports = mongoose.model('computer', ComputerSchema);