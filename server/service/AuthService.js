import bcrypt from 'bcrypt';
import userModel from '../models/user-model.js';
import ApiError from '../exceptions/api-error.js';
import UserDto from '../dtos/UserDto.js';
import tokenService from './TokenService.js';

class AuthService {
  async registration(email, password, userName) {
    const candidate = await userModel.findOne({email});
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    
    const user = await userModel.create({email, password: hashPassword, userName});
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
    return {
      ...tokens,
      user: userDto
    };
  }
}

export default new AuthService();