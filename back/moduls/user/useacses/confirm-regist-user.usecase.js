class ConfirmRegistUserUsecase {
	constructor(userSchema) {
		this.userSchema = userSchema;
	}

	async run(string){
		try{
			const foundedUser = await this.userSchema.findOne({ string });

			if(foundedUser.confirmRegist){
				throw new Error(`User: ${foundedUser.username} already confirm registration`);
			}
			if(!foundedUser){
				throw new Error('Confirm registration false');
			}
			foundedUser.confirmRegist = true;
			const result =  await foundedUser.save();
			if(!result){
				throw new Error(`User: ${foundedUser.username} save failed`)
			}
		} catch (e){
			throw new Error(e.message);
		}

	}
}

module.exports = ConfirmRegistUserUsecase;