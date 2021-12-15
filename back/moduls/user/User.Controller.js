
class UserController {
	constructor({ createUserUsecase, authUserUsecase, updateUserUsecase, deleteUserUsecase, confirmRegistUserUsecase }) {

		this.createUserUsecase = createUserUsecase;
		this.authUserUsecase = authUserUsecase;
		this.updateUserUsecase = updateUserUsecase;
		this.deleteUserUsecase = deleteUserUsecase;
		this.confirmRegistUserUsecase = confirmRegistUserUsecase;
	}
	async createUser(req, res){
		try{
			const { username, email, pass } = req.body;
			const result =  await this.createUserUsecase.run(username, email, pass);
			res.cookie('token', result.token, {
				secure: true,
				httpOnly: true,
			});
			res.json(result.registeredUser);

		} catch (e){
			res.status(400);
		    res.json({ error: e.message });
		}
	}
	async confirmRegistUser(req, res, confirmPage){
		try{
			const { string } = req.query;
			await this.confirmRegistUserUsecase.run(string);
			res.send(confirmPage, 'utf-8', err => console.log(err.message));


		}catch(e){
			res.status(403);
			res.json({ error: e.message });
		}
	}

	async authUser(req, res){
		try {
			const { username, pass } = req.body;
			const result = await this.authUserUsecase.run({ username, pass });
			res.cookie('token', result.token, {
				secure: true,
				httpOnly: true,
			});
			res.json({ user: result.foundedUser });
		} catch(e){
			res.status(403);
			res.json({ error: e.message })
		}
	}
	async updateUser(req, res){
		try{
			const { username, email, pass, id } = req.body;
			const result = await this.updateUserUsecase.run({ username, email, pass, id });
			res.cookie('token', result.newToken, {
				secure: true,
				httpOnly: true,
			});
			res.json(result.foundedUser);

		} catch(e){
			res.status(400);
			res.json({ error: e.message });
		}
	}
	async deleteUser(req, res){
		try{
			const userId = req.params;
			const deletedUser = await this.deleteUserUsecase.run(userId);
			res.json(deletedUser);
		} catch(e){
			res.status(400);
			res.json({ error: e.message });
		}
	}
}

module.exports = UserController;