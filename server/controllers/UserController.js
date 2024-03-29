import UserService from "../services/UserService"
import ApiError from "../exceptions/api-errors"

class UserController {
    async registration(req, reply){
      try{
        const { userName, password } = req.body.data.attributes
        const { user, chat, accessToken, refreshToken, chatList, messageList } = await UserService.registration(userName, password)
        const data = { user, chat, accessToken, refreshToken, chatList, messageList}
        reply.setCookie('refreshToken', refreshToken, { maxAge: 15*24*60*60*1000, httpOnly: true})
        reply.send(data)
      } catch(e){
        console.log(e)
        throw new ApiError(e)
      }
    }

    async login(req, reply){
      try{
        const { userName, password } = req.body.data.attributes
        const { user, chat, accessToken, refreshToken, chatList, messageList } = await UserService.login(userName, password)
        const data = { user, chat, accessToken, refreshToken, chatList, messageList}
        reply.setCookie('refreshToken', refreshToken, {maxAge: 15*24*60*60*1000,httpOnly: true})
        reply.send(data)
      } catch(e){
        throw new ApiError(e)
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
      const data = await UserService.refreshUserToken(refreshToken, reply)
      reply.setCookie('refreshToken', data.refreshToken, {maxAge: 15*24*60*60*1000,httpOnly: true})
      reply.send(data)
    }

    async profileUpdate(req, reply, s3){
      const file = req.body.file
      const userId = req.params.id
      console.log(userId)
      const user = await UserService.profileUpdate(file, userId, s3)
      reply.send(user)
    }
}

export default new UserController();