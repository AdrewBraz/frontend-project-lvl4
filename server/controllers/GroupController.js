import GroupService from "../services/GroupService"

class GroupController {
    async postChat(req, reply){
      try{
        const { groupName, removable, userId } = req.body.data.attributes
        const chat = await GroupService.createChat(groupName, userId, removable)
        const channel = {
            groupName: chat.groupName,
            removable: true,
            id: chat.id,
          };
        const data = {
            data: {
              type: 'channels',
              id: channel.id,
              attributes: channel,
            },
          };
        return data
      } catch(e){
        console.log('Something went wrong')
        throw new Error(e)
      }
    }

    async deleteChatById(req, reply){
      const channelId = req.params.id;
      const chat = await GroupService.deleteChat(channelId)
      const data = {
        data: {
          type: 'channels',
          id: chat.id,
          groupName: chat.groupName
        },
      };
      reply.send(data)
      reply.code(204);
      return data
    }
    async getChat( req, reply){
      const groupId = req.params.id;
      console.log('switched', groupId)
      const { chat, messageList } = await GroupService.getChatById(groupId)
      const resources = {
        type: 'channels',
        id: groupId,
        attributes: {messageList, chat},
      };
      const response = {
        data: resources,
      };
      reply.send(response)
      return response
    }

    async editChatName(req, reply){
      const groupId = req.params.id
      const { data: { attributes } } = req.body;
      const groupName = attributes.groupName
      const chat = await GroupService.updateChat(groupId, groupName)
      reply.send(chat)
      return chat
    }

    async getChats(req, reply){
      const data = await GroupService.getAllChats()
      reply.send(data)
      return data
    }

    async subscribeToChannel(req, reply){
      const {userId, groupId } = req.body;
      const { chat } = await GroupService.subscribe(groupId, userId)
      const resources = {
        type: 'channels',
        id: groupId,
        attributes: {chat},
      };
      const response = {
        data: resources,
      };
      reply.send(response)
      return response
    }
}

export default new GroupController();