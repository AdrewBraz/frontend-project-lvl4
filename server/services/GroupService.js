import Groups from '../models/group_model'
import GrouprDto from "../dtos/GroupDto"
import MessageService from './MessageService'

class GroupService {
  async addUserToDefaultGroups(userId){
    const user = await Groups.findOne({groupName: 'General', participants: userId})
    if(user){
        console.log("User already in the chat")
    }
    const generalChat = await Groups.findOneAndUpdate({groupName: 'General'},{$push: {participants: userId}}, {returnOriginal: false})
    return generalChat
  }
  async createChat(groupName, userId, removable){
    const chat = await Groups.findOne({groupName})
    if(chat){
        console.log("Channel with this name is already existed")
    }
    const newChat = await Groups.create({groupName, removable, participants: [userId]})
    const chatDto =  new GrouprDto(newChat)
    return newChat
  }

  async findAvailabelChats(userId){
    const chatList = await Groups.find({ participants: userId})
    const result = chatList.map(item => ({id: item.id, removable: item.removable, groupName: item.groupName}))
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
}

export default new GroupService()