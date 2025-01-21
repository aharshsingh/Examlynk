const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,16}$')).required()
});

const tokenSchema = Joi.object({
    token : Joi.string().required()
});

const testSchema = Joi.object({
    title: Joi.string().max(30).required(),
    descriptions: Joi.string().required(),
});

const questionSchema = Joi.object({
    question: Joi.string().required(),
    options: Joi.array().items(Joi.string().required()).required(),
    marks: Joi.number().required(),
    testId: Joi.string().required(), 
    correctOption: Joi.string().required()
});

const adminRegisterSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,16}$')).required(),
    role: Joi.string().required()
});

module.exports = { adminRegisterSchema, loginSchema, tokenSchema, testSchema, questionSchema };