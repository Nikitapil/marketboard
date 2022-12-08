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
    const userData = await AuthService.createUserData(user);
    
    return userData;
  }

  async login(email, password) {
    const user = await userModel.findOne({email});
    if (!user) {
      throw ApiError.BadRequest('Incorrect email or password');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw ApiError.BadRequest('Incorrect email or password');
    }

    const userData = await AuthService.createUserData(user);
    return userData;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnautorizedError();
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnautorizedError();
    }
    const user = await userModel.findById(userData.id);
    const responseData = await AuthService.createUserData(user);
    return responseData;
  }
  
  static async createUserData(user) {
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