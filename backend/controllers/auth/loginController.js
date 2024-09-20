const { loginSchema, tokenSchema } = require('../../services/validator');
const customErrorHandler = require('../../customErrorHandler/customErrorHandler');
const bcrypt = require('bcrypt');
const JwtService = require('../../services/JWTService');
const Userbase = require('../../models/User');
// const Jwt = require('../../models/JWT');

const loginController = {
    async login(req, res, next) {
        // Validation
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        try {
            const exist = await Userbase.exists({ email: req.body.email });
            if (!exist) {
                const { email, password } = req.body;
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new Userbase({
                    email,
                    password: hashedPassword,
                });
                try {
                    const result = await user.save();
                } catch (err) {
                    return next(err);
                }
            }

            const user = await Userbase.findOne({ email: req.body.email });
            if (!user)
                return next(customErrorHandler.wrongCredentials('Username or password is wrong'));

            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return next(customErrorHandler.wrongCredentials('Username or password is wrong'));
            }

            // Token
            const token = JwtService.sign({ _id: user.id, role: user.role});
            console.log(user.role);
            // const access_token = new Jwt({ token });
            // await access_token.save();
            res.json(token);
        } catch (err) {
            return next(err);
        }
    }

    // async verify(req, res, next) {
    //     // Validation of the JWT token
    //     const { error } = tokenSchema.validate(req.body);
    //     if (error) {
    //         return next(error);
    //     }

    //     let accessToken;
    //     let userId;
    //     try {
    //         accessToken = await Jwt.findOne({ token: req.body.token });
    //         if (!accessToken) {
    //             return next(customErrorHandler.notAuthorized('Invalid access token'));
    //         }

    //         try {
    //             const { _id } = JwtService.verify(accessToken.token);
    //             userId = _id;
    //         } catch (error) {
    //             return next(customErrorHandler.notAuthorized('Invalid access token'));
    //         }

    //         const user = await Userbase.findOne({ _id: userId });
    //         if (!user) {
    //             return next(customErrorHandler.notAuthorized('No user found!'));
    //         }
    //     } catch (err) {
    //         return next(new Error('Something went wrong, ' + err.message));
    //     }

    //     res.send('Successfully logged in.');
    // }
};

module.exports = loginController;
