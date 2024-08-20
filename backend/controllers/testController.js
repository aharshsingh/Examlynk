const CustomErrorHandler = require('../customErrorHandler/customErrorHandler');
const Test = require('../models/Test');
const testController = {
    async getTest(req,res,next) {
        try {
            const test = await Test.findOne({});
            if(!test){
                return next(CustomErrorHandler.notFound('Test not found!'))
            }
            res.json(test);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = testController;