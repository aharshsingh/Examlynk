const nodemailer = require('nodemailer');
const { APP_EMAIL, APP_PASS } = require('../config');
const checkSubmissions = require('../services/checkSubmission');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: APP_EMAIL, 
        pass: APP_PASS 
    }
});

checkSubmissions(transporter);
