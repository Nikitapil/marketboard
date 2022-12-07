import jwt from 'jsonwebtoken'
import tokenModel from '../models/token-model.js';

class TokenService {

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: '15m'});
    return {accessToken, refreshToken};
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({user: userId});
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      tokenData.save();
    }
    const token = await tokenModel.create({user: userId, refreshToken});
    return token;
  }
}

export default new TokenService();