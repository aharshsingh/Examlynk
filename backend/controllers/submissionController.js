const Submission = require('../models/Submissions');

const submissionController = {
    async uploadSubmission(req, res, next) {
    const { testId, userId, selections, endedAt } = req.body;

    if (!testId || !userId || !selections || !endedAt) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

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
        console.error('Error saving submission:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

}

module.exports = submissionController;