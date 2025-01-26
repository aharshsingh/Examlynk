const express = require('express');
const router = express.Router();
const {adminAuth, loginController, testController, adminController, questionController, submissionController, userController} = require('../controllers/index')
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.post('/adminRegister', adminAuth.adminRegister);
router.post('/login', loginController.login);
router.get('/question/:queID', auth, questionController.getQuestion);
router.post('/uploadTest', auth, admin, adminController.uploadTest);
router.get('/test/:testId', auth, testController.getTest);
router.post('/uploadQuestion', auth, admin, adminController.uploadQuestion);
router.patch('/updateTest/:testID', auth, admin, adminController.updateTest);
router.post('/uploadSubmission', auth, submissionController.uploadSubmission);
router.get('/getuser', auth, userController.getUser);
router.get('/getalltest', auth, testController.getAllTest);
module.exports = router;

