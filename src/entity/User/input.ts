import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { USER_ROLE } from '../../shared/types/interface';
import { User } from './model';

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  @Length(2, 50)
  firstName: string;

  @Field()
  @Length(2, 50)
  lastName: string;

  @Field()
  @Length(5, 150)
  email: string;

  @Field()
  @Length(8, 150)
  password: string;

  @Field(_ => USER_ROLE)
  role: USER_ROLE

  @Field({ nullable: true })
  displayPicture?: string

}

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field({nullable:true})
  @Length(2, 50)
  firstName?: string;

  @Field({nullable:true})
  @Length(2, 50)
  lastName?: string;

  @Field({ nullable: true })
  displayPicture?: string
}
