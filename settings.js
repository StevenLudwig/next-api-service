require('dotenv').config();


const SETTINGS = {
	MONGO: {
		URI: process.env.MONGO_URI
	}
};

module.exports = SETTINGS;