const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userbaseSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
}, { 
    timestamps: true, 
});

module.exports = mongoose.model('Userbase', userbaseSchema, 'userbases');
