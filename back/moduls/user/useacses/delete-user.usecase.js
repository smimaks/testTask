class DeleteUserUsecase{
	constructor(userSchema) {
		this.userSchema = userSchema;
	}

	async run(userId){
		const foundedUser = await this.userSchema.findOne({ userId });
		if(!foundedUser){
			throw new Error(`User: ${userId} not found`);
		}
	const deleteResult = await this.userSchema.deleteOne({ userId });
		if(!deleteResult){
			throw new Error(`Error delete user: ${userId}`);
		}
		return foundedUser;
	}
}

module.exports = DeleteUserUsecase;