import Messages from '../models/message_model'

class MessageService {
  async createMessage(messageText, userName, date, groupId){
    const data = await Messages.create({text: messageText, author: userName, timestamp: date, groupId})
    return {
      data
    }
  }
}

export default new MessageService()