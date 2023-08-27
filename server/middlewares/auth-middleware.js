import TokenService from "../services/TokenService"

export default async (req, reply) => {
    try {
      const authorizationHeader = req.headers.authorization
      if(!authorizationHeader){
        throw Error('Unauthorized user')
      }
      const accessToken = authorizationHeader.split(' ')[1]
      if(!accessToken){
        throw Error('Unauthorized user')
      }
      const userData =  await TokenService.validateAccessToken(accessToken)
      if(!userData){
        throw Error('Unauthorized user')
      }
      req.user = userData
    } catch(e){
        throw Error('Unauthorized user')
    }
}