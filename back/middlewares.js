const colors = require('colors');
const { decodedToken } = require('./Utils');
const { userSchema } = require('./DI')


const requestLogger = (req, res, next) => {
	console.log(`[${new Date(Date.now()).toLocaleTimeString().magenta}] ${req.method.yellow}`);
	next();
};

const validateToken = async (req, res, next) => {
	try{
		const token = req.cookies.token;
		if(!token){
			throw new Error('Forbidden. Need authorization');
		}
		const userData = await decodedToken(token);

		const foundedUser = await userSchema.findOne({ username: userData.username, email: userData.email  });
		if(!foundedUser){
			throw new Error('invalid token');
		}
		//пока полежит тут
		if(!foundedUser.confirmRegist){
			throw new Error(`User: ${foundedUser.username} doesnt confirm registration`);
		}
		next();
	} catch(e){
		res.status(403);
		res.json({ error: e.message });
	}
}

module.exports = {
	validateToken,
	requestLogger,

}