import UserService from "../services/UserService";

class UserController {
    async registration(req, reply){
      try{
        const { userName, password } = req.body.data.attributes
        const { user, chat, accessToken, refreshToken, chatList, messageList } = await UserService.registration(userName, password)
        const data = { user, chat, accessToken, refreshToken, chatList, messageList}
        reply.send(data)
        reply.setCookie('refreshToken', refreshToken, { maxAge: 15*24*60*60*1000, httpOnly: true})
        return data
      } catch(e){
        console.log(e)
        throw new Error(e)
      }
    }

    async login(req, reply){
      try{
        const { userName, password } = req.body.data.attributes
        const { user, chat, accessToken, refreshToken, chatList, messageList } = await UserService.login(userName, password)
        const data = { user, chat, accessToken, refreshToken, chatList, messageList}
        reply.send(data)
        reply.setCookie('refreshToken', refreshToken, {maxAge: 15*24*60*60*1000,httpOnly: true})
        return data
      } catch(e){
        throw new Error(e)
      }
    }

    async logout(req, reply){
      const { refreshToken } = req.cookies
      const token = await UserService.logout(refreshToken)
      reply.send(token)
      reply.clearCookie('refreshToken')
    }

    async refresh(req, reply){
      const { refreshToken } = req.cookies
      const data = await UserService.refreshUserToken(refreshToken)
      reply.send(data)
      reply.setCookie('refreshToken', refreshToken, {maxAge: 15*24*60*60*1000,httpOnly: true})
      return data
    }
}

export default new UserController();