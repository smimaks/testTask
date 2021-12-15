const {_logFunc} = require("nodemailer/lib/shared");

class TextController {
	constructor({ correctTextFileUsecase }) {
		this.correctTextFileUsecase = correctTextFileUsecase;
	}

	async correctFile(req, res){
			try {
				const buffer = req.body;
				const correctedText = await this.correctTextFileUsecase.run(buffer);
				res.end(correctedText, 'utf-8', err => console.log(err));
			} catch(e){
				res.status(400);
				res.json({ error: e.message });
			}
	}
}

module.exports = TextController;