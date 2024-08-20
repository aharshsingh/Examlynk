const express = require('express');
const router = express.Router();
const {loginController, testController, adminController, questionController, submissionController, mailController} = require('../controllers/index')

//API for the server
router.post('/login', loginController.login);
router.post('/verify', loginController.verify);
router.get('/test', testController.getTest);
router.get('/question/:queID', questionController.getQuestion);
router.post('/uploadTest', adminController.uploadTest);
router.post('/uploadQuestion', adminController.uploadQuestion);
router.patch('/updateTest/:testID', adminController.updateTest);
router.post('/uploadSubmission', submissionController.uploadSubmission);
module.exports = router;

