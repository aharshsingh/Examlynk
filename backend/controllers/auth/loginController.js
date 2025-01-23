const { loginSchema, tokenSchema } = require('../../services/validator');
const customErrorHandler = require('../../customErrorHandler/customErrorHandler');
const bcrypt = require('bcrypt');
const JwtService = require('../../services/JWTService');
const Userbase = require('../../models/User');

const loginController = {
    async login(req, res, next) {
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

            const token = JwtService.sign({ _id: user.id, role: user.role});
            res.json({ token });
        } catch (err) {
            return next(err);
        }
    }
};

module.exports = loginController;
