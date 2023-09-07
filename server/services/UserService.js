import Users from '../models/user_model'
import UploadService from './UploadService';

import bcrypt from 'bcrypt'
import TokenService from './TokenService';
import GroupService from './GroupService';
import MessageService from './MessageService';
import UserDto from '../dtos/userDto';
import GroupDto from '../dtos/GroupDto'
import ApiError from '../exceptions/api-errors';

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
    const chat = await GroupService.addUserToDefaultGroups(userDto.id.toString())
    const chatList = await GroupService.findAvailabelChats(userDto.id.toString())
    const chatDto = new GroupDto(chat)
    const messageList = await MessageService.getChatMessages(chatDto.id)
    await TokenService.saveToken(userDto.id, refreshToken)
    return {
      accessToken,
      refreshToken,
      user: userDto,
      chat: chatDto,
      chatList,
      messageList
    }
  }

  async login(userName, password){
    const user = await Users.findOne({userName});
    if(!user){
      throw new ApiError.BadRequest(e, 'User does not exist')
    }
    const isPassEquals = bcrypt.compare(password, user.password)
    if(!isPassEquals){
      throw new ApiError.BadRequest(e, 'Wrong password')
    }
    const userDto = new UserDto(user)
    console.log(userDto)
    const { accessToken, refreshToken } = TokenService.createTokens({...userDto})
    const chat = await GroupService.addUserToDefaultGroups(userDto.id.toString())
    const chatList = await GroupService.findAvailabelChats(userDto.id.toString())
    console.log(chat)
    const chatDto = new GroupDto(chat)
    const messageList = await MessageService.getChatMessages(chatDto.id)
    await TokenService.saveToken(userDto.id, refreshToken)
    return {
      accessToken,
      refreshToken,
      user: userDto,
      chat: chatDto,
      chatList,
      messageList
    }
  }

  async logout( refreshToken ){
    const data = await TokenService.removeToken(refreshToken)
    return data
  }

  async refreshUserToken(refreshToken) {
    if(!refreshToken){
      throw new ApiError.UnauthorizedError()
    }
    const userData = await TokenService.validateRefreshToken(refreshToken)
    const token = await TokenService.findToken(refreshToken)
    if(!userData || !token){
      throw new ApiError.UnauthorizedError()
    }
    const user =  await Users.findById(userData.id)
    const userDto = new UserDto(user)
    console.log(userDto)
    const data = TokenService.createTokens({...userDto})
    const chatList = await GroupService.findAvailabelChats(userDto.id.toString())
    const defaultChat = chatList.find((item) => item.groupName === 'General')
    const messageList = await MessageService.getChatMessages(defaultChat.id)
    await TokenService.saveToken(userDto.id, refreshToken)
    return { accessToken: data.accessToken, refreshToken: data.refreshToken, user: userDto, chatList, messageList, chat: defaultChat}
  }

  async profileUpdate(file, userId, s3){
    try{
      const url = await UploadService.imageUpload(file, userId, s3)
      console.log(typeof url)
      const user = await Users.findOneAndUpdate({_id: userId}, { $set: { url }}, { new: true})
      return user
    } catch(e){
      throw new ApiError.BadRequest(e, 'Some error occured')
    }
  }
}

export default new UserService()