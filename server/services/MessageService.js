import { v4 as uuidv4 } from 'uuid';
import Messages from '../models/message_model'
import MessageDto from '../dtos/messageDto'

class MessageService {
  async createMessage(data){
    const newMessage = await Messages.create({...data})
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

  async imageUpload(file, userId, s3){
    const fileName = `${uuidv4()}_${file.filename}`
    const url = await s3.Upload({
      buffer: file._buf,
      name: fileName
    },
    `/${userId}/`
    )
    return url.Location
  }
}

export default new MessageService()