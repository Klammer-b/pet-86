const authService = require('../services/auth');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }
  login = async (req, res) => {
    const token = await this.authService.login(req.body);

    res.json({
      status: 200,
      message: 'User logged in successfully!',
      data: {
        token,
      },
    });
  };
  register = async (req, res) => {
    const user = await this.authService.register(req.body);

    res.json({
      status: 200,
      message: 'User registered successfully!',
      data: user,
    });
  };
  logout = async () => {};
}

const authController = new AuthController(authService);

module.exports = authController;
