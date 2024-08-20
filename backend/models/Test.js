const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
  title: { type: String, required: true },
  descriptions: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question'}],
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Test', testSchema, 'tests');