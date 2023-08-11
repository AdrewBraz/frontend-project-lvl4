import Users from '../models/user_model'

import bcrypt from 'bcrypt'
import TokenService from './TokenService';
import GroupService from './GroupService';
import UserDto from '../dtos/userDto';
import GroupDto from '../dtos/GroupDto'

class UserService {
  async registration(userName, password){
    const user = await Users.findOne({userName});
    if(user){
      throw new Error('User with this nickName is already existed!')
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const newUser = await Users.create({userName, password: hashPassword})
    const userDto = new UserDto(newUser)
    const { accessToken, refreshToken } = TokenService.createTokens({...userDto})
    const chat = await GroupService.addUserToDefaultGroups(userDto.id)
    const chatDto = new GroupDto(chat)
    await TokenService.saveToken(userDto.id, refreshToken)
    return {
      accessToken,
      refreshToken,
      user: userDto,
      chat: chatDto
    }
  }
}

export default new UserService()