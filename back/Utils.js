const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const crypto = require('crypto');


const hashPassword  = string =>
	crypto.createHmac('sha256', process.env.SECRET_KEY)
		.update(string)
		.digest('hex');


//simple version
const generateToken = async payload => await jwt.sign(payload, process.env.SECRET_KEY)

const decodedToken = async token => await jwt.verify(token, process.env.SECRET_KEY);

// create random link path for confirm registration
const createLink = (secretString) => {
	return `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}${process.env.CONFIRM_PATH}?string=${secretString}`;
}



module.exports = {
	hashPassword,
	generateToken,
	decodedToken,
	createLink,
}