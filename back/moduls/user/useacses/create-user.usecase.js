const { hashPassword, generateToken, createLink } = require('../../../Utils');

class CreateUserUsecase {
	constructor({ userSchema, mail }) {
		this.userSchema = userSchema;
		this.mail = mail;
	}

	async run(username, email, pass){
		try {
			const foundedUser = await this.userSchema.findOne({ username, email });
			if (foundedUser) {
				throw new Error(`User with id: ${foundedUser.username} already regist`);
			}
			const secretString = Math.random().toString(36).substr(2, 12);
			const createDate = new Date();
			const password = hashPassword(pass);
			const userData = {
				username,
				email,
				password,
				createDate,
				secretString,
			};

			const user = new this.userSchema(userData);
			const registeredUser = await user.save();
			if(!registeredUser){
				throw new Error(`User: ${username} dont saved`);
			}
			const link = createLink(secretString);
			const token = await generateToken({ username, email });

			const sendInfo = await this.mail.send(registeredUser.email, link);
			if(!sendInfo){
				throw new Error(`Failed send confirm message to user ${registeredUser.username}`);
			}
			return { registeredUser, token }

		} catch (e) {
			throw new Error(e.message);
		}
	}
}

module.exports = CreateUserUsecase;