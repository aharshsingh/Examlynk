const Submission = require('../models/Submissions');

const submissionController = {
    async uploadSubmission(req,res,next){
        const { testId, userId, selections, endedAt } = req.body;
        const submission = new Submission({
            testId, 
            userId, 
            selections, 
            endedAt
        });
        
        try {
            const result = await submission.save();
            res.json(result);
        } catch (error) {
            return next(error);
        }
    },

    async checkSubmissions(){
        
    }
}

module.exports = submissionController;