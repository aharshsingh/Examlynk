const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,16}$')).required()
});

const tokenSchema = Joi.object({
    token : Joi.string().required()
});

const testSchema = Joi.object({
    title: Joi.string().alphanum().max(30).required(),
    descriptions: Joi.string().alphanum().required(),
});

const questionSchema = Joi.object({
    question: Joi.string().alphanum().required(),
    options: Joi.array().items(Joi.string().required()).required(),
    marks: Joi.number().required(),
    correctOption: Joi.string().required()
});
module.exports = { loginSchema, tokenSchema, testSchema, questionSchema };