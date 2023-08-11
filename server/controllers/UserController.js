import UserService from "../services/UserService";

class UserController {
    async registration(req, reply){
      try{
        const { userName, password } = req.body
        const { user, chat, accessToken, refreshToken } = await UserService.registration(userName, password)
        return { user, chat, accessToken, refreshToken }
      } catch(e){
        throw new Error(e)
      }
    }
}

export default new UserController();