import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error.js';
import authService from '../service/AuthService.js';

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const {email, password, userName } = req.body;
      const userData = await authService.registration(email, password, userName);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: AuthController.getMaxRefreshTokenCookieAge(), httpOnly: true});
      return res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async login(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  static getMaxRefreshTokenCookieAge() {
    return 30 * 24 * 60 * 60 *1000;
  }
}

export default new AuthController();