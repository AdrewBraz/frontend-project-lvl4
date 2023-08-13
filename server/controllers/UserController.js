import UserService from "../services/UserService";

class UserController {
    async registration(req, reply){
      try{
        const { userName, password } = req.body.data.attributes
        console.log(userName, password)
        const { user, chat, accessToken, refreshToken, chatList } = await UserService.registration(userName, password)
        console.log(chatList)
        return { user, chat, accessToken, refreshToken, chatList }
      } catch(e){
        throw new Error(e)
      }
    }
}

export default new UserController();