const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jwtSchema = new Schema({
    token: { type: String, unique: true }
}, { timestamps: false });

module.exports = mongoose.model('Jwt', jwtSchema, 'jwts');
