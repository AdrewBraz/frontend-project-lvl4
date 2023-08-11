import Groups from '../models/group_model'

class GroupService {
  async addUserToDefaultGroups(userId){
    const user = await Groups.findOne({groupName: 'General', participants: userId})
    if(user){
        console.log("User already in the chat")
    }
    const generalChat = await Groups.findOneAndUpdate({groupName: 'General'}, {$set: {$push: {participants: userId}}}, {returnOriginal: false})
    return generalChat
  }
  async createChat(groupName, userId){
    const chat = await Groups.findOne({groupName})
    if(chat){
        console.log("Channel with this name is already existed")
    }
    console.log(userId)
    const newChat = await Groups.create({groupName, participants: [userId]})
    return newChat
  }
}

export default new GroupService()