/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
// const user = require('./models/user');
// const project = require('./models/project');

const { Schema } = mongoose;
const keys = require('./keys');

mongoose.pluralize(null);

module.exports = () => {
	mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

	mongoose.Promise = global.Promise;

	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', () => {
		console.info('CONNECTED TO DB!');
	});
};
