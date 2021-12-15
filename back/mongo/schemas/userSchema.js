const mongoose = require('mongoose');
const joi = require('joi');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		// required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true
	},
	createDate: {
		type: Date,
		required: true
	},
	updateDate: {
		type: Date,
	},
	confirmRegist: {
		type: Boolean,
		default: false
	},
	secretString: {
		type: String,
		unique: true,
		required: true
	},
	activeDB: {
		type: Array
	},
},
{ versionKey: false, collection: 'user' });

module.exports = mongoose.model('User', userSchema);
