import { Length } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';
import { Product } from './model';

@InputType()
export class ProductInput implements Partial<Product> {
  @Field()
  @Length(1, 50)
  title: string;

  @Field({ nullable: true })
  @Length(0, 500)
  description?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  photo?: string;

  @Field((_) => ID!)
  categoryID: string;
}

@InputType()
export class UpdateProductInput implements Partial<Product> {
  @Field({ nullable: true })
  @Length(1, 50)
  title?: string;

  @Field({ nullable: true })
  @Length(0, 500)
  description?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  photo?: string;

  @Field((_) => ID, { nullable: true })
  categoryID?: string;
}
