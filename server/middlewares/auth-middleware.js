import TokenService from "../services/TokenService"

export default (req, reply) => {
    try {
      const authorizationHeader = req.headers.authorization
      console.log(authorizationHeader)
      if(!authorizationHeader){
        throw Error('Unauthorized user')
      }
      const accessToken = authorizationHeader.split(' ')[1]
      if(!accessToken){
        throw Error('Unauthorized user')
      }
      const userData = TokenService.validateAccessToken(accessToken)
      if(!userData){
        throw Error('Unauthorized user')
      }
      req.user = userData
    } catch(e){
        throw Error('Unauthorized user')
    }
}