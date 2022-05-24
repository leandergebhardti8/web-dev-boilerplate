const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
    
    /* User Schema */
	const userSchema = new mongoose.Schema({
		full_name: {
			type: String,
			trim: true,
		},
		username: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			unique: false,
			require: true,
		},
	});

	userSchema.methods.comparepassword=function(password, hash, cb){
		bcrypt.compare(password, hash, function(err, isMatch){
			if(err) return cb(false);
			cb(null, isMatch);
		})
	}

	const user = mongoose.model('user', userSchema);

    module.exports = user;