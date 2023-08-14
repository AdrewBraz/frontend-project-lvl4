import UserService from "../services/UserService";

class UserController {
    async registration(req, reply){
      try{
        const { userName, password } = req.body.data.attributes
        const { user, chat, accessToken, refreshToken, chatList, messageList } = await UserService.registration(userName, password)
        const data = { user, chat, accessToken, refreshToken, chatList, messageList}
        reply.send(data)
        reply.setCookie('refreshToken', refreshToken, {httpOnly: true})
        return data
      } catch(e){
        console.log(e)
        throw new Error(e)
      }
    }
}

export default new UserController();