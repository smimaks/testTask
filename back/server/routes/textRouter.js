const express = require('express');
const textRouter = express.Router();
const { textController } = require('../../DI');
const fs = require('fs');

textRouter.post('/', async (req, res) => {
	await textController.correctFile(req, res);
});

module.exports = textRouter;