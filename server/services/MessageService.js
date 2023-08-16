import Messages from '../models/message_model'
import MessageDto from '../dtos/messageDto'

class MessageService {
  async createMessage(messageText, userName, date, groupId){
    const newMessage = await Messages.create({text: messageText, author: userName, timestamp: date, groupId})
    return newMessage
    
  }

  async getChatMessages(groupId){
    const data = await Messages.find({groupId})
    return data
  }

  async deleteMessages(groupId){
    const data = await Messages.deleteMany({groupId})
    return data
  }
}

export default new MessageService()