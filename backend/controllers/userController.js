const Userbase = require('../models/User');

const userController = {
async getUser(req, res, next){
  try {
    const result = await Userbase.findById(req.user._id).select('-isDeleted -createdAt -updatedAt -__v -password');
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

}

module.exports = userController;
