import { ExpressContext } from "apollo-server-express";
import { Field, ObjectType } from "type-graphql";
import { User } from "../entity/User/model";
import { ApolloError } from 'apollo-server-errors';


@ObjectType()
export class LoginResponse {
    @Field((_) => User)
    user:User

    @Field((_) => String)
    accessToken:string

    @Field((_) => String)
    refreshToken:string

}

@ObjectType()
export class GetNewTokenResponse extends LoginResponse {
}



export interface MyContext extends ExpressContext {
    user: User | null,
    accessToken: string | null
}

interface tokenProps {
    userId:string
}

export interface accessTokenProps extends tokenProps {}
export interface passwordResetTokenProps extends tokenProps {}
export interface refreshTokenProps extends tokenProps {
    tokenVersion:number
}



export class LoginExpiredError extends ApolloError {
  constructor(message: string) {
    super(message, 'LOGIN_EXPIRED');

    Object.defineProperty(this, 'name', { value: 'LoginExpiredError' });
  }
}

export class InvalidCredentialsError extends ApolloError {
  constructor(message: string) {
    super(message, 'INVALID_CREDENTIALS');

    Object.defineProperty(this, 'name', { value: 'InvalidCredentialsError' });
  }
}
