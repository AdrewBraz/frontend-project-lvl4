import MessageService from "../services/MessageService"
import ApiError from "../exceptions/api-errors"
import UploadService from "../services/UploadService"

class MessageController {
    async postMessage(req, reply, s3){
      try{
        const { text, date, userId, userName } = req.body
        const file = req.body.file
        const groupId = req.params.channelId
        const data = {
          text: text.value,
          timestamp: date.value,
          author: {
            userName: userName.value,
            id: userId.value
          },
          groupId
        }
        if(file.value !== ''){
          const url = await UploadService.imageUpload(file, userId.value, s3)
          const message = await MessageService.createMessage({...data, url})
          reply.send({message})
          return message
        }
        const message = await MessageService.createMessage(data)
        reply.send({message})
          return message
        } catch(e){
          console.log(e)
        throw new ApiError(e)
      }
    }

    async deleteMessages({data}){
      try{
        await MessageService.deleteMessages(data.id)
      } catch(e){
        throw new ApiError
      }
    }
}

export default new MessageController();