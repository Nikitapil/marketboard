import ApiError from '../exceptions/api-error.js';
import tokenService from '../service/TokenService.js';

export default function(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnautorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnautorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnautorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnautorizedError());
  }
}