const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  testId: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
  marks: { type: Number, required: true },
  correctOption: { type: String, required: true },
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Question', questionSchema,'questions');
