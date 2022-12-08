import jwt from 'jsonwebtoken'
import tokenModel from '../models/token-model.js';

class TokenService {

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: '30d'});
    return {accessToken, refreshToken};
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_SECRET)
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_SECRET)
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({user: userId});
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
      return;
    }
    const token = await tokenModel.create({user: userId, refreshToken});
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.findOneAndDelete({refreshToken});
    return tokenData;
  }

  async findToken(refreshToken) {
    const token = await tokenModel.findOne({refreshToken});
    return token;
  }
}

export default new TokenService();