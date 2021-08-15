import { ExpressContext } from "apollo-server-express"
import { compare, hash } from "bcrypt"
import { sign, verify } from "jsonwebtoken"
import { MiddlewareFn } from "type-graphql"

import Container, { Service } from "typedi"
import { User } from "../entity/User/model"
import { UserService } from "../entity/User/service"
import { ChangePasswordInput } from "./input"
import { accessTokenProps, MyContext, passwordResetTokenProps, refreshTokenProps } from "./types"
// import { UserService } from "entity/User/service"


@Service()
export class AuthService extends UserService {

  private NOT_AUTHENTICATED_ERROR_MESSAGE = 'Not authenticated'
  private NOT_AUTHORIZED_ERROR_MESSAGE = 'Not authorized'  
  

  getUserFromHeader:(c:ExpressContext)=>Promise<User|null>= async (ctx:ExpressContext) => {
      const authHeader = (ctx.req).get('Authorization')
      if (!authHeader) return null
      try {
        const token = authHeader.replace('Bearer ', '')
        const payload= verify(token,process.env.ACCESS_TOKEN_SECRET!) as accessTokenProps
        const user = await this.getOne(payload.userId) 
        return user ?? null
      }catch {
          return null
      }
    }

    getUserFromRefreshToken:(c:string) => Promise<User|null> = async (refreshToken:string) => {
        if (!refreshToken) return null
        try {
            const payload= verify(refreshToken,process.env.REFRESH_TOKEN_SECRET!) as refreshTokenProps
            const user = await this.getOne(payload.userId) 
            return user ?? null
        } catch {
            return null
        }
    }

    getUserFromPasswordResetToken:(c:string) => Promise<User|null> = async (passwordResetToken:string) => {
        if (!passwordResetToken) return null
        try {
            const payload= verify(passwordResetToken,process.env.PASSWORD_RESET_TOKEN_SECRET!) as passwordResetTokenProps
            const user = await this.getOne(payload.userId) 
            return user ?? null
        } catch {
            return null
        }
    }

    createAccessToken:(u:User)=>string = (user:User) => {
        const payload:accessTokenProps = {
            userId:user.id
        }
        return sign(payload,process.env.ACCESS_TOKEN_SECRET!,{
            expiresIn:"15m"
        })
    }
    
    createRefreshToken:(u:User)=>string = (user:User) => {
        const payload:refreshTokenProps = {
            userId:user.id,
            tokenVersion:user.tokenVersion
        }
        return sign(payload,process.env.REFRESH_TOKEN_SECRET!,{
            expiresIn:"7d"
        })
    }

    createPasswordResetToken:(u:User)=>string = (user:User) => {
        const payload:passwordResetTokenProps = {
            userId:user.id
        }
        return sign(payload,process.env.PASSWORD_RESET_TOKEN_SECRET!,{
            expiresIn:"1d"
        })
    }
    
   isAuthenticated: MiddlewareFn<MyContext> = ({context},next) => {
        if (!context.user) throw(this.NOT_AUTHENTICATED_ERROR_MESSAGE)
        return next()
    }

    
    userIsAdmin:MiddlewareFn<MyContext> = ({context},next) => {
        if (!context.user) throw(this.NOT_AUTHENTICATED_ERROR_MESSAGE) 
        if (!this.isAdmin(context.user!)) throw(this.NOT_AUTHORIZED_ERROR_MESSAGE)
        return next()
    }

    revokeRefreshTokensForUser:(userId:string) => Promise<boolean> = async (userId) => {
        try {
            const user = await this.getOne(userId)
            if (!user) throw('User with this id doesn\'t exist')
            this.incrementTokenNumber(user)
            return true
        } catch {
            return false
        }
    }

    refreshTokenIsRevoked:(refreshToken:string,user:User) => Promise<boolean> = async (refreshToken,user) => {
        try {
            const payload= verify(refreshToken,process.env.REFRESH_TOKEN_SECRET!) as refreshTokenProps
            return user.tokenVersion !== payload.tokenVersion
        }
        catch {
            throw('Invalid refresh token')
        }
    }

    setPassword:(user:User,password:string) => Promise<boolean> = async(user,newPassword) => {
        try{
            user.password = await hash(newPassword,12)
            user.save()
            user.tokenVersion += 1
            return true
        } catch {
            return false
        }
    }

    changePassword:(userId:string,p:ChangePasswordInput) => Promise<boolean> = async(userId,{currentPassword,newPassword}) => {
        try {
            const user = await this.getOne(userId)
            if (!user) throw('User with this id doesn\'t exist')
            const match = await compare(currentPassword,user.password)
            if (!match) throw('Incorrect current password')
            user.password = await hash(newPassword,12)
            user.save()
            user.tokenVersion += 1
            return true
        }
        catch {
            return false
        }
    }
}

export const authService = Container.get(AuthService)
