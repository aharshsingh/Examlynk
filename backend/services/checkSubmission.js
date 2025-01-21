const Submission = require('../models/Submissions');
const Questions = require('../models/Questions');
const User = require('../models/User');
const { APP_EMAIL } = require('../config');
const Test = require('../models/Test');

const checkSubmissions = async (transporter) => {
    console.log('Checking submissions...');
  
    try {
      const submissions = await Submission.find({ isDeleted: false });
  
      if (submissions.length > 0) {
        for (const submission of submissions) {
          let totalMarks = 0;
          try {
            for (const selection of submission.selections) {
              const question = await Questions.findOne({ _id: selection.questionId });
              if (question.correctOption === selection.option) {
                totalMarks += question.marks;
              }
            }
  
            const user = await User.findOne({ _id: submission.userId });
            const test = await Test.findOne({ _id: submission.testId });
  
            if (user) {
              const mailOptions = {
                from: APP_EMAIL,
                to: user.email,
                subject: 'Your Test Results',
                text: `Hello ${user.email},\n\nYour total marks for the test ${test.title} are: ${totalMarks}.\n\nBest regards`
              };
  
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log('Error sending email:', error);
                } else {
                  console.log('Email sent:', info.response);
                }
              });
  
              await Submission.updateOne({ _id: submission._id }, { isDeleted: true });
            } else {
              console.log(`User not found for ID: ${submission.userId}`);
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
  };
  
module.exports = checkSubmissions;