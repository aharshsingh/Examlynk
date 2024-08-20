const cron = require('node-cron');
const Submission = require('../models/Submissions');
const Questions = require('../models/Questions');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Set up Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ulices.mante@ethereal.email',
        pass: '7CMbDdGGT3ZnMhMKda'
    }
});

cron.schedule('*/30 * * * * *', async () => {
  console.log('Running a task every 30 seconds to check submissions...');

  try {
    const submissions = await Submission.find({
      isDeleted: false
    });

    if (submissions.length > 0) {
      for (const submission of submissions) {
        var totalMarks = 0;
        try {
          for (const selection of submission.selections) {
            const question = await Questions.findOne({ _id: selection.questionId });
            if (question.correctOption === selection.option) {
              totalMarks += question.marks;
            }

            const user = await User.findOne({ _id: submission.userId });
            if (user && user.email) {
              const mailOptions = {
                from: 'aharshsingh25@gmail.com',
                to: 'vyaskavya2003@gmail.com',
                subject: 'Your Test Results',
                text: `Hello ${user.name},\n\nYour total marks for the test are: ${totalMarks}.\n\nBest regards,\nYour Team`
              };

              // Send the email
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log('Error sending email:', error);
                } else {
                  console.log('Email sent:', info.response);
                }
              });
            } else {
              console.log(`User not found for ID: ${submission.userId}`);
            }
          }
        } catch (error) {
          console.error(`Error processing submission with ID: ${submission._id}`, error);
        }
      }
    } else {
      console.log("No submissions yet!");
    }
  } catch (error) {
    console.error('Error during submission check:', error);
  }
});
