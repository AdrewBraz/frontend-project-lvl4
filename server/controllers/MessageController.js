import MessageService from "../services/MessageService"
import mongoose from "mongoose"

class MessageController {
    async postMessage(req, reply){
      try{
        const { text, author, date } = req.body.data.attributes
        const groupId = req.params.channelId
        const message = await MessageService.createMessage(text, author, date, groupId)
        console.log(message)
        reply.send({message})
        return message
      } catch(e){
        throw new Error(e)
      }
    }
}

export default new MessageController();