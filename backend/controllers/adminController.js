const { testSchema, questionSchema } = require('../services/validator');
const Test = require('../models/Test');
const Questions = require('../models/Questions')
const adminController = {
    async uploadTest(req,res,next){

        const {error} = testSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const { title, descriptions, questions } = req.body;
        const test = new Test({
            title,
            descriptions,
            questions
        });

        try {
            const result = await test.save();
            res.json(result);
        } catch (error) {
            return next(error);
        }
    },

    async uploadQuestion(req,res,next){
        const {error} = questionSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const { question, options, testId , marks, correctOption } = req.body;
        const questions = new Questions({
            question,
            options,
            testId,
            marks,
            correctOption
        });
        try {
            const result = await questions.save();
            res.json(result);
        } catch (error) {
            return next(error);
        }
    },

    async updateTest(req,res,next){
        try {
            const updatedTest = await Test.findByIdAndUpdate(req.params.testID, req.body, { new: true });
            if (!updatedTest) {
                return res.status(404).json({ message: 'Test not found' });
            }
            res.json(updatedTest);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
}

module.exports = adminController;