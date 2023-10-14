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
  async getUserChats(id, type){
    console.log(id, type)
    const userTypes = {
      'newUser': async() => {
        const chat = await GroupService.addUserToDefaultGroups(id.toString())
        const chatDto = new GroupDto(chat)
        const chatList = await GroupService.findAvailabelChats(id.toString())
        return { chat: chatDto, chatList }
      },
      'loggedUser': async() => {
        const chatList = await GroupService.findAvailabelChats(id.toString())
        const chat = chatList.find((item) => item.groupName === 'General')
        console.log(chatList, chat)
        return { chat, chatList }
      }
    }
    return await userTypes[type]()
  }

  async getUserData(user, userType){
    const userDto = new UserDto(user)
    const { accessToken, refreshToken } = TokenService.createTokens({...userDto})
    const { chat, chatList } = await this.getUserChats(userDto.id, userType)
    console.log(chat)
    const messageList = await MessageService.getChatMessages(chat.id)
    await TokenService.saveToken(userDto.id, refreshToken)
    return {
      accessToken,
      refreshToken,
      user: userDto,
      chat,
      chatList,
      messageList
    }


  }

  async registration(userName, password){
    const user = await Users.findOne({userName});
    if(user){
      throw new Error('User with this nickName is already existed!')
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const newUser = await Users.create({userName, password: hashPassword})
    
    const data =  await this.getUserData(newUser, 'newUser')
    return data
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
    
    const data =  await this.getUserData(user, 'loggedUser')
    return data
  }

  async logout( refreshToken ){
    const data = await TokenService.removeToken(refreshToken)
    return data
  }

  async refreshUserToken(userToken) {
    if(!userToken){
      throw new ApiError.UnauthorizedError()
    }
    const userData = await TokenService.validateRefreshToken(userToken)
    const token = await TokenService.findToken(userToken)
    if(!userData || !token){
      throw new ApiError.UnauthorizedError()
    }
    const user =  await Users.findById(userData.id)
    const data =  await this.getUserData(user, 'loggedUser')
    return data
  }

  async profileUpdate(file, userId, s3){
    try{
      console.log(file, userId)
      const url = await UploadService.imageUpload(file, userId, s3)
      console.log(url)
      const user = await Users.findOneAndUpdate({_id: userId}, { $set: { url }}, { new: true})
      return user
    } catch(e){
      throw new ApiError.BadRequest(e, 'Some error occured')
    }
  }
}

export default new UserService()