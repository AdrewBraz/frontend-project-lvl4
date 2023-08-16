import jwt from "jsonwebtoken";
import Tokens from '../models/token_model'

class TokenService{
    createTokens(payload){
        const accessToken = jwt.sign(payload, 'SomeFrase', {expiresIn: '1d'})
        const refreshToken = jwt.sign(payload, 'SomeFrase', {expiresIn: '30d'})
        return { accessToken, refreshToken }
    }

    async saveToken(userId, token){
        const user = await Tokens.findOne({user: userId})
        if(user){
            user.refreshToken = token
            return user.save()
        }
        const newToken = await Tokens.create({user: userId, refreshToken: token})
        console.log(newToken)
        return newToken
    }
    
}

export default new TokenService()