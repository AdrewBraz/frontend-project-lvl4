import GroupService from "../services/GroupService"


class GroupController {
    async postChat(req, reply){
      try{
        const { name } = req.body.data.attributes
        const chat = await GroupService.createChat(name, '64d5ef2b2093185f043ed178')
        const channel = {
            name: chat.groupName,
            removable: true,
            id: chat._id,
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
}

export default new GroupController();