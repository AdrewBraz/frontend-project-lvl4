import MessageService from "../services/MessageService"
import mongoose from "mongoose"

class MessageController {
    async postMessage(req, reply){
      try{
        const { text, author, date } = req.body.data.attributes
        const attachments = req.body.data
        console.log(req.file)
        const groupId = req.params.channelId
        // const message = await MessageService.createMessage(text, author, date, groupId)
        // reply.send({message})
        // return message
      } catch(e){
        throw new Error(e)
      }
    }

    async deleteMessages({data}){
      await MessageService.deleteMessages(data.id)
    }
}

export default new MessageController();