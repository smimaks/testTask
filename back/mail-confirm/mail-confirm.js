const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const mail = {};
 mail.send = async (mail, path) => {
	let testAccount = nodemailer.createTestAccount();

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.MAIL_ACC,
			pass: process.env.MAIL_PASS,
		}
	})

	return await transporter.sendMail({
		from: `"Database Manager" <${process.env.MAIL_ACC}>`,
		to: `${mail}`,
		subject: 'Confirm Registration',
		text: 'This message was sent for confirm registration',
		html: `Link for confirm registration: <a href="${path}">PRESS TO CONFIRM REGISTRATION</a>`,
	})

}
module.exports = mail;