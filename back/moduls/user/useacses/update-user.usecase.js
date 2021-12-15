const { hashPassword, generateToken } = require('../../../Utils')

class UpdateUserUsecase{
	constructor(userSchema) {
		this.userSchema = userSchema;
	}
	async run(userData){
		try{
			const { username, pass, email, id } = userData;
			const foundedUser = await this.userSchema.findOne({ id });
			if(!foundedUser){
				throw new Error(`User: ${username} not founded`);
			}

			foundedUser.username = username || foundedUser.username;
			foundedUser.email = email || foundedUser.email;
			foundedUser.password = hashPassword(pass) || foundedUser.password;
			foundedUser.updateDate = new Date();
			const result = await foundedUser.save();
			if(!result){
				throw new Error(`Save update user: ${foundedUser.id} failed`);
			}
			const newToken = await generateToken({ username: foundedUser.username, email: foundedUser.email });
			console.log(newToken)
			return { foundedUser, newToken };
		} catch(e){
			throw e.message;
		}
	}
}

module.exports =  UpdateUserUsecase;