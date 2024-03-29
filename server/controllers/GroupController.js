import GroupService from "../services/GroupService"

class GroupController {
    async postChat(req, reply){
      try{
        const { groupName, role, userId } = req.body.data.attributes
        const chat = await GroupService.createChat(groupName, userId, role)
        const channel = {
            groupName: chat.groupName,
            role,
            id: chat.id,
          };
        const data = {
              type: 'channels',
              id: channel.id,
              attributes: channel,
          };

        reply.send(data)
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
          attributes: chat
        },
      };
      reply.send(data)
      reply.code(204);
      return data
    }
    async getChat( req, reply){
      const groupId = req.params.id;
      const { chat, messageList } = await GroupService.getChatById(groupId)
      const resources = {
        type: 'channels',
        id: groupId,
        attributes: {messageList, chat},
      };
      reply.send(resources)
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

    async subscribeToChannel(req, reply, role){
      const {userId, groupId } = req.body;
      const { chat  } = await GroupService.subscribe(groupId, userId)
      const resources = {
        type: 'channels',
        id: groupId,
        role,
        attributes: {chat},
      };
      reply.send(resources)
    }

    async unsubscribeToChannel(req, reply){
      const {userId, groupId } = req.body;
      const { chat } = await GroupService.unSubscribe(groupId, userId)
      const resources = {
        type: 'channels',
        id: groupId,
        attributes: {chat},
      };
 
      reply.send(resources)
    }
}

export default new GroupController();