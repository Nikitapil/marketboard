import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error.js';
import authService from '../service/AuthService.js';
import tokenService from '../service/TokenService.js';

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
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const {email, password} = req.body;
      const userData = await authService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: AuthController.getMaxRefreshTokenCookieAge(), httpOnly: true});
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await tokenService.removeToken(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
        const {refreshToken} = req.cookies;
        const userData = await authService.refresh(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: AuthController.getMaxRefreshTokenCookieAge(), httpOnly: true});
        return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  static getMaxRefreshTokenCookieAge() {
    return 30 * 24 * 60 * 60 *1000;
  }
}

export default new AuthController();