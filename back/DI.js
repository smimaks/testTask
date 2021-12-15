
const userSchema = require('./mongo/schemas/userSchema');
const mail = require('./mail-confirm/mail-confirm');
const APiText = require('./text-correct-api/api-text');
//
// const mainRouter = require('./server/routes/mainRouter');
// const userRouter = require('./server/routes/userRouter');
// const textRouter = require('./server/routes/textRouter');

const UserController = require('./moduls/user/User.Controller');
const TextController = require('./moduls/text/TextController');


const CreateUserUsecase = require('./moduls/user/useacses/create-user.usecase');
const AuthUserUsecase = require('./moduls/user/useacses/auth-user.usecase');
const UpdateUserUsecase = require('./moduls/user/useacses/update-user.usecase');
const DeleteUserUsecase = require('./moduls/user/useacses/delete-user.usecase');
const ConfirmRegistUserUsecase = require('./moduls/user/useacses/confirm-regist-user.usecase');

const CorrectTextFileUsecase = require('./moduls/text/usecases/correct-text-file.usecase');

const createUserUsecase = new CreateUserUsecase({ userSchema, mail });
const authUserUsecase = new AuthUserUsecase(userSchema);
const updateUserUsecase = new UpdateUserUsecase(userSchema);
const deleteUserUsecase = new DeleteUserUsecase(userSchema);
const confirmRegistUserUsecase = new ConfirmRegistUserUsecase(userSchema);



const apiText = new APiText();
const correctTextFileUsecase = new CorrectTextFileUsecase(apiText);

const userController = new UserController({
	createUserUsecase,
	authUserUsecase,
	updateUserUsecase,
	deleteUserUsecase,
	confirmRegistUserUsecase,
});
const textController = new TextController({ correctTextFileUsecase, });


module.exports = {
	userController,
	userSchema,
	textController,
	// mainRouter,
	// userRouter,
	// textRouter
}