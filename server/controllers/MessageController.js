import MessageService from "../services/MessageService"


class MessageController {
    async postMessage(req, reply){
      try{
        console.log(req.body)
        const { text, author, date } = req.body.data.attributes
        const groupId = req.params.channelId
        const { data } = await MessageService.createMessage(text, author, date, groupId)
        return data
      } catch(e){
        throw new Error(e)
      }
    }
}

export default new MessageController();