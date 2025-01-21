const loginController = require('./auth/loginController');
const testController = require('./testController');
const adminController = require('./adminController');
const questionController = require('./questionController');
const submissionController = require('./submissionController');
const adminAuth = require('./auth/adminAuth');
const userController = require('./userController');
module.exports = { adminAuth, loginController, testController, adminController, questionController, submissionController, userController };