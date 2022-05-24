const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

	/* Environment */
	const environmentSchema = new mongoose.Schema({
		name: String,
		action: String,
		url: String,
		builds: [String],
	});

	/* deployMethod */
	const deployMethod = new mongoose.Schema({
		name: String,
		environments: [environmentSchema],
	});

	/* Project */
	const projectSchema = new mongoose.Schema({
		projectId: {
			type: String,
			index: true
		},
		user: {
			type: String,
			unique: true,
		},
		id: String,
		name: String,
		githubURL: String,
		repoName: String,
		repoOwner: String,
		githubToken: String,
		deployMethods: [deployMethod],
	});

	const project = mongoose.model('projects', projectSchema);

    module.exports = project;