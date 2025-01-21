const JwtService = require('../services/JWTService');
const CustomErrorHandler = require('../customErrorHandler/customErrorHandler');

const auth =async(req,res,next) => {
    let authHeader = req.headers.authorization;
    if(!authHeader){
        return  next(CustomErrorHandler.notAuthorized());
    }
    const token = authHeader.split(' ')[1];
    try {
        const { _id, role } = JwtService.verify(token);
        const user = {
            _id,
            role
        }
        req.user = user;
        console.log(user._id);
        next();
    } catch (error) {
        return next(CustomErrorHandler.notAuthorized());
    }
}
module.exports = auth;