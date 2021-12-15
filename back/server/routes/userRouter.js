const express = require('express');
const userRouter = express.Router();
const { userController } = require('../../DI');
const { validateToken }  = require('../../middlewares');
const path = require("path");
const fs = require("fs");


const pathToConfirmPage = path.resolve(__dirname, '../../../front/html/confirm-regist.html');
const confirmPage = fs.readFileSync(pathToConfirmPage, 'utf-8');


userRouter.post('/',
	async (req, res) =>
	await userController.createUser(req, res));

userRouter.get('/confirm',
	async (req, res) =>
	await userController.confirmRegistUser(req, res, confirmPage));

userRouter.post('/auth',
	async (req, res) =>
		await userController.authUser(req, res));

userRouter.delete('/del/:userId', validateToken,
	async (req, res) =>
		await userController.deleteUser(req, res));

userRouter.put('/update', validateToken,
	async (req, res) =>
		await userController.updateUser(req, res));





module.exports = userRouter;