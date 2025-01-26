const CustomErrorHandler = require('../customErrorHandler/customErrorHandler');

const adminAuth = (req,res,next) => {
    if(req.user.role !== 'admin') {
        console.log(req.user.role)
        return next(CustomErrorHandler.notAuthorized('Access denied. Admin only!'));
    }
    next();
};

module.exports = adminAuth;