import jwt from "jsonwebtoken";
import Tokens from '../models/token_model'

class TokenService{
    createTokens(payload){
        const accessToken = jwt.sign(payload, 'SomeFrase', {expiresIn: '5m'})
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
        return newToken
    }

    async removeToken(refreshToken){
        const token = Tokens.deleteOne({refreshToken})
        return token
    }

    async validateAccessToken(token){
        try{
            const userData = await jwt.verify(token, 'SomeFrase')
            return userData
        } catch(e){
            throw new Error('invalid token')
        }
    }

    async validateRefreshToken(token){
        try{
            const userData = await jwt.verify(token, 'SomeFrase')
            return userData
        } catch(e){
            throw new Error('invalid token')
        }
    }

    async findToken(refreshToken){
        const token = Tokens.findOne({refreshToken})
        return token
    }
    
}

export default new TokenService()