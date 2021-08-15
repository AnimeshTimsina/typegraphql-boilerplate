import {  Resolver, Mutation, Arg, ID } from 'type-graphql';
import { Service } from 'typedi';
import {  ChangePasswordInput, GetNewTokenInput, LoginInput, ResetPasswordInput } from './input';


import {  GetNewTokenResponse, LoginResponse } from './types';
import { compare } from 'bcrypt';
import { User } from '../entity/User/model';
import { AuthService } from './services';
import { BoolResponse } from '../shared/types/graphql-types';
import { emailService } from '../shared/services/emailService';

@Service()
@Resolver(_ => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  
  @Mutation((_) => LoginResponse)
  async login(
    @Arg('LoginInput') loginInput: LoginInput,
  ): Promise<LoginResponse> {
    const user = await this.authService.getByEmail(loginInput.email)
    if (!user) throw('User doesn\'t exist')
    const isValid = await compare(loginInput.password,user.password)
    if (!isValid) throw('Invalid credentials')
    return({
        user: user,
        accessToken:this.authService.createAccessToken(user),
        refreshToken:this.authService.createRefreshToken(user)
    })
  }

  @Mutation((_) => GetNewTokenResponse)
  async getNewToken(
    @Arg('getNewTokenInput') getNewTokenInput: GetNewTokenInput,
  ): Promise<GetNewTokenResponse> {
      const user = await this.authService.getUserFromRefreshToken(getNewTokenInput.refreshToken)
      if (!user) throw('Incorrect refresh token')
      if (await this.authService.refreshTokenIsRevoked(getNewTokenInput.refreshToken,user)) throw('Incorrect refresh token')
      return({
          user:user,
          accessToken:this.authService.createAccessToken(user),
          refreshToken:this.authService.createRefreshToken(user)
      })
  }

  @Mutation((_) => BoolResponse)
  async revokeRefreshTokensForUser(@Arg('userId',()=>ID!) userId:string) : Promise<BoolResponse>{
    return { ok : await this.authService.revokeRefreshTokensForUser(userId)}
  }

  @Mutation((_) => BoolResponse)
  async changePassword(@Arg('userId',()=>ID!) userId:string, @Arg('ChangePassworInput') changePasswordInput:ChangePasswordInput) : Promise<BoolResponse>{
    return { ok : await this.authService.changePassword(userId,{...changePasswordInput})}
  }

  @Mutation((_) => BoolResponse)
  async sendPasswordResetMail(@Arg('email',() => String!) email:string):Promise<BoolResponse>{
    const user = await this.authService.getByEmail(email)
    if (!user) throw ('User with this email doesn\'t exist') 
      const token = this.authService.createPasswordResetToken(user)
      try {
        await emailService.sendMail({
          to:user.email,
          subject:'Password Reset',
          text: `Click on this link to reset your password: https://localhost:5000/passwordreset/${token}`
        })
        return {
          ok: true
        }
      } catch {
        return {
          ok:false
        }
      }
  }

  @Mutation((_) => BoolResponse)
  async resetPassword(
    @Arg('resetPasswordInput') resetPasswordInput: ResetPasswordInput,
  ):Promise<BoolResponse>{
    const {token,newPassword,confirmNewPassword} = resetPasswordInput
    if (newPassword !== confirmNewPassword) throw('Passwords don\'t match')
    const user = await this.authService.getUserFromPasswordResetToken(token)
    if (!user) throw('Invalid token')
    const success = await this.authService.setPassword(user,confirmNewPassword)
    return {
      ok: success
    }
  }
}