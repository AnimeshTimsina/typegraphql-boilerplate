import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class GetNewTokenInput {
  @Field()
  refreshToken: string;  
}

@InputType()
export class ChangePasswordInput {
  @Field()
  currentPassword: string;  

  @Field()
  @Length(8,150)
  newPassword: string; 
}

@InputType()
export class ResetPasswordInput {
  @Field()
  token: string;  

  @Field()
  @Length(8,150)
  newPassword: string; 

  @Field()
  @Length(8,150)
  confirmNewPassword: string; 
}

