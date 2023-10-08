import { v4 as uuidv4 } from 'uuid';
import Messages from '../models/message_model'
import MessageDto from '../dtos/messageDto'

class MessageService {
  async createMessage(data){
    const message = await Messages.create({...data})
    const { _id } = message;
    const newMessage = await Messages.aggregate([
      {
        $match: {_id: _id}
      },
      {
        '$lookup': {
          'from': 'users', 
          'localField': 'author.id', 
          'foreignField': '_id', 
          'as': 'result'
        }
      }, {
        '$unwind': {
          'path': '$result', 
          'includeArrayIndex': 'string', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$set': {
          'userAvi': '$result.url'
        }
      }
    ])
    return newMessage[0]
    
  }

  async getChatMessages(groupId){
    const data = await Messages.aggregate([
      {
        $match: {groupId}
      },
      {
        '$lookup': {
          'from': 'users', 
          'localField': 'author.id', 
          'foreignField': '_id', 
          'as': 'result'
        }
      }, {
        '$unwind': {
          'path': '$result', 
          'includeArrayIndex': 'string', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$set': {
          'userAvi': '$result.url'
        }
      }
    ])
    console.log(data)
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