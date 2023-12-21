const fs = require('node:fs/promises');
const path = require('node:path');
const Handlebars = require('handlebars');
const jwt = require('jsonwebtoken');
const { SMTP_USER, JWT_SECRET } = require('../constants/env');
const transport = require('../utils/nodemailer');
const usersService = require('../../users/services/users');

class EmailService {
  constructor(usersService) {
    this.usersService = usersService;
  }
  async sendEmail({ email, subject, html }) {
    try {
      return await transport.sendMail({
        to: email,
        from: SMTP_USER,
        html,
        subject,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async sendResetPasswordLink(email) {
    const file = await fs.readFile(
      path.join(__dirname, 'templates', 'resetPasswordLink.html'),
    );

    const template = Handlebars.compile(file.toString());

    const user = await this.usersService.findByEmail(email);

    const token = jwt.sign(
      {
        sub: user._id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: 1200 },
    );
    const html = template({
      name: user.name,
      resetLink: `http://localhost:5555/reset-password?token=${token}`,
    });

    return await this.sendEmail({
      email,
      subject: 'Reset password link',
      html,
    });
  }
}

const emailsService = new EmailService(usersService);

module.exports = emailsService;
