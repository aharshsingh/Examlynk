const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  testId: { type: Schema.Types.ObjectId, ref: 'Test', required: true,},
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true,},
  selections: [{
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true,},
    option: { type: String, required: true,},
    savedAt: { type: Date, default: Date.now, },  }],
  endedAt: { type: Date, default: Date.now, },
  isDeleted: { type: Boolean, default: false, }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Submission', submissionSchema, 'submissions');
