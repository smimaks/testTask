const { hashPassword, generateToken } = require('../../../Utils');

class AuthUserUsecase {
	constructor(userSchema) {
		this.userSchema = userSchema;
	}

	async run(userData){
		try{
			const { username, pass } = userData;
			const password = hashPassword(pass);
			const foundedUser = await this.userSchema.findOne({ username });
			if(!foundedUser){
				throw new Error(`User: ${userData.username} doesn't regist`)
			}
			if(foundedUser.password === password){
				const token = await generateToken({ username, password });
				return {
					foundedUser,
					token,
				}
			}

		}catch(e){
			throw e.message;
		}



	}
}

module.exports = AuthUserUsecase;