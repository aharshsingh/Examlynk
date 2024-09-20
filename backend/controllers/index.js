const loginController = require('./auth/loginController');
const testController = require('./testController');
const adminController = require('./adminController');
const questionController = require('./questionController');
const submissionController = require('./submissionController');
const adminAuth = require('./auth/adminAuth');

module.exports = { adminAuth, loginController, testController, adminController, questionController, submissionController };