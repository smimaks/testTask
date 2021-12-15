const mongoose = require('mongoose');
const dotenv = require('dotenv').config();


const startDbConnection = async () => {
	try{
		await mongoose.connect(process.env.DB_URL);
		console.log('MongoDB: is connected');
	} catch(e){
		throw e.message;
	}
}
module.exports = startDbConnection;
