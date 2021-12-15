const express = require('express');
const path = require("path");
const fs = require("fs");
const mainRouter = express.Router();

const pathToRegistPage = path.resolve(__dirname, '../../../front/html/index.html');
const registPage = fs.readFileSync(pathToRegistPage, 'utf-8');


mainRouter.get('/', (req, res) => {
	res.end(registPage, 'utf-8', err => console.log(err));
});


module.exports = mainRouter;
