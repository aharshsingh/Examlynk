const Userbase = require('../models/User');

const userController = {
async getUserEmail(req, res, next){
  try {
    const result = await Userbase.findById(req.user._id);
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ email: result.email });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

}

module.exports = userController;
