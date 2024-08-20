const Questions = require('../models/Questions')
const questionController = {
    async getQuestion(req,res,next){
        try {
            const result = await Questions.findById(req.params.queID);
            if(!result){
                return next(CustomErrorHandler.notFound('Question not found!'));
            }
            res.json(result);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = questionController;