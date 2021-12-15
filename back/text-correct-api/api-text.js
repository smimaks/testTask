const axios = require('axios');
const {_logFunc} = require("nodemailer/lib/shared");
const dotenv = require('dotenv').config();

class APiText{

	async getCorrectText (string) {
	try {
	const uri = `https://speller.yandex.net/services/spellservice.json/checkTexts?text=${string}`;
	const path = encodeURI(uri);
	const response = await axios.get(path);

	return response.data[0];
	} catch (e){
		throw new Error(e.message);
	}
 };
}
module.exports = APiText;




