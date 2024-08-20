const loginController = require('./auth/loginController');
const testController = require('./testController');
const adminController = require('./adminController');
const questionController = require('./questionController');
const submissionController = require('./submissionController');
const mailController = require('./mailController')
module.exports = { loginController, testController, adminController, questionController, submissionController, mailController };