const { authService } = require('../services/auth');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  login = async (req, res) => {
    const { accessToken, refreshToken } = await this.authService.login(
      req.body,
    );

    res.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
    });

    res.json({
      status: 200,
      message: 'User logged in successfully!',
      data: {
        token: accessToken,
      },
    });
  };

  register = async (req, res) => {
    console.log(this.authService);
    const user = await this.authService.register(req.body);

    res.json({
      status: 200,
      message: 'User registered successfully!',
      data: user,
    });
  };

  refresh = async (req, res) => {
    const { refreshToken } = req.cookies;
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshAccess(refreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      secure: true,
      httpOnly: true,
    });

    res.json({
      status: 200,
      message: 'Token refreshed!',
      data: {
        token: accessToken,
      },
    });
  };

  logout = async (req, res) => {
    res.clearCookie('refreshToken');
    res.json({
      status: 200,
      message: 'User is logged out!',
    });
  };

  getResetToken = async (req, res) => {
    const { email } = req.body;
    await authService.sendResetLinkToEmail(email);

    res.json({
      status: 200,
      message: `Reset link is sent to ${email}`,
    });
  };

  resetPassword = async (req, res) => {
    const { token, password } = req.body;
    await authService.resetPassword({ token, password });

    res.json({
      status: 200,
      message: `Password for is reset`,
    });
  };
}

const authController = new AuthController(authService);

module.exports = authController;
