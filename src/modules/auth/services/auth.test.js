const HttpError = require('../../common/models/HttpError');
const usersService = require('../../users/services/users');
const { AuthService, authService } = require('./auth');

jest.spyOn(usersService, 'updateUserById').mockReturnValue();

describe('AuthService', () => {
  describe('refreshAccess', () => {
    it('throws 401 if token is not provided', async () => {
      const authService = new AuthService();
      const throwable = async () => {
        throw new Error('test');
      };

      const test = async () => {
        try {
          await authService.refreshAccess();
        } catch (err) {
          throw err;
        }
      };

      await expect(test()).rejects.toEqual(
        new HttpError(401, 'Refresh token is invalid'),
      );
    });
  });
});
