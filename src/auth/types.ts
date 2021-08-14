import { ExpressContext } from "apollo-server-express";
import { Field, ObjectType } from "type-graphql";
import { User } from "../entity/User/model";


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

@ObjectType()
export class BoolResponse {
    @Field((_) => Boolean)
    ok:boolean
}

export interface MyContext extends ExpressContext {
    user: User | null
}

interface tokenProps {
    userId:string
}

export interface accessTokenProps extends tokenProps {}
export interface refreshTokenProps extends tokenProps {
    tokenVersion:number
}

