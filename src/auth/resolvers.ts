import {  Resolver, Mutation, Arg, ID } from 'type-graphql';
import { Service } from 'typedi';
import {  ChangePasswordInput, GetNewTokenInput, LoginInput } from './input';


import {  GetNewTokenResponse, LoginResponse } from './types';
import { compare } from 'bcrypt';
import { User } from '../entity/User/model';
import { AuthService } from './services';



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

  @Mutation((_) => Boolean)
  async revokeRefreshTokensForUser(@Arg('userId',()=>ID!) userId:string){
    return await this.authService.revokeRefreshTokensForUser(userId)
  }

  @Mutation((_) => Boolean)
  async changePassword(@Arg('userId',()=>ID!) userId:string, @Arg('ChangePassworInput') changePasswordInput:ChangePasswordInput){
    return await this.authService.changePassword(userId,{...changePasswordInput})
  }



}