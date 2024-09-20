const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userbaseSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
    role: { type: String, required: true, default: 'user'}
}, { 
    timestamps: true, 
});

module.exports = mongoose.model('Userbase', userbaseSchema, 'userbases');
