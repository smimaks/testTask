const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const startDbConnection = require('../mongo/mongoConnection');
const { requestLogger } = require('../middlewares');
// const { mainRouter, userRouter, textRouter } = require('../DI');
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const textRouter = require('./routes/textRouter');

app.use(express.raw({
	inflate: true,
	limit: '10mb',
	type: '*/*'
}));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);


app.use(mainRouter);
app.use('/user', userRouter);
app.use('/text', textRouter);



startDbConnection().then();
app.listen(+process.env.PORT, process.env.HOST, () => console.log(`Server: listen port ${process.env.PORT}...`))