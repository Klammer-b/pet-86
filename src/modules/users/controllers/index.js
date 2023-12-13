const saveFileToCloudinary = require('../../common/utils/saveFileToCloudinary');
const saveFileToStorage = require('../../common/utils/saveFileToStorage');
const usersService = require('../services/users');

class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  updateMe = async (req, res, next) => {
    const userId = req.user._id;
    const { body } = req;
    const avatarUrl = await saveFileToCloudinary(req.file);
    const user = await this.usersService.updateUserById(userId, {
      ...body,
      avatarUrl,
    });

    res.json({
      status: 200,
      message: 'User updated successfully!',
      data: user,
    });
  };
}

const usersController = new UsersController(usersService);

module.exports = usersController;
