import Groups from '../models/group_model'
import GrouprDto from "../dtos/GroupDto"
import MessageService from './MessageService'

class GroupService {
  async addUserToDefaultGroups(userId){
    try {
      const user = await Groups.findOne({groupName: 'General', participants: {$in: [{userId}]}})
      if(user){
          console.log("User already in the chat")
          const generalChat = await Groups.findOne({ groupName: 'General'})
          return generalChat
      }
      const generalChat = await Groups.findOneAndUpdate({groupName: 'General'},{$push: {participants: {user_id: userId, role: 'user'}}}, {returnOriginal: false})
      return generalChat
    } catch(e){
      console.log('done')
    }
  }
  async createChat(groupName, userId, role){
    const chat = await Groups.findOne({groupName})
    if(chat){
        console.log("Channel with this name is already existed")
    }
    const newChat = await Groups.create({groupName,  participants: {user_id: userId, role}})
    return newChat
  }

  async findAvailabelChats(userId){
    const chatList = await Groups.find({ participants: { $elemMatch: {user_id: userId}}})
    console.log(chatList)
    const result = chatList.map(item => ({id: item._id, role: item.participants.find(item => item.user_id === userId).role, groupName: item.groupName}))
    return result
  }

  async deleteChat(groupId){
    try{
      const chat = await Groups.findOneAndDelete({_id: groupId})
      const chatDto = new GrouprDto(chat);
      return chatDto
    } catch(e){
      throw new Error('Some error in query')
    }
  }
  async getChatById(groupId){
    const chat = await Groups.findById(groupId)
    const chatDto = new GrouprDto(chat);
    const messageList = await MessageService.getChatMessages(chatDto.id)
    return { chat: chatDto, messageList}
  }

  async updateChat(groupId, groupName){
    const chat = await Groups.findOneAndUpdate({_id: groupId}, { $set: { groupName }}, { new: true})
    const chatDto = new GrouprDto(chat);
    return chatDto
  }

  async getAllChats(){
    const chats = await Groups.find({})
    return chats
  }

  async subscribe(groupId, userId, role){
    //check if user in the chat
    const chat = await Groups.findOneAndUpdate({ _id: groupId },{$push: {participants: {user_id: userId, role }}}, {returnOriginal: false})
    const chatDto = new GrouprDto(chat);
    return { chat: chatDto}
  }

  async unSubscribe(groupId, userId){
    //check if user in the chat
    const chat = await Groups.findOneAndUpdate({ _id: groupId },{$pull: {participants: {user_id: userId, role: 'user'}}}, {returnOriginal: false})
    const chatDto = new GrouprDto(chat);
    return { chat: chatDto}
  }
}

export default new GroupService()