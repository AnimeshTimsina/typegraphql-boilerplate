import { IsInt, IsPhoneNumber, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Customer } from './model';

@InputType()
export class CustomerInput implements Partial<Customer> {
  @Field()
  @Length(1, 50)
  fullName: string;

  @Field({ nullable: true })
  @IsPhoneNumber('NP')
  phone?: string;

  @Field({ nullable: true })
  @Length(1, 100)
  address?: string;

  @Field({ nullable: true })
  @IsInt()
  vat?: number;

  @Field({ nullable: true })
  @Length(1, 500)
  description?: string;
}
