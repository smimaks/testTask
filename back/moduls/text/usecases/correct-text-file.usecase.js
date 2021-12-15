const fs = require('fs/promises');
const path = require('path');
const MagicString = require('magic-string');


class CorrectTextFileUsecase {
	constructor(apiText) {
	this.apiText = apiText;
	}
	async run(buffer){
		try{
			const textFile = buffer.toString();
			const source = new MagicString(textFile);
			const correctedWords = await this.apiText.getCorrectText(textFile);
			correctedWords.forEach(data => source.overwrite(data.pos, data.pos + data.len, data.s[0]));
			return source.toString();

		} catch(e) {
			throw new Error(e.message)
		}
	}
}

module.exports = CorrectTextFileUsecase;