import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { ProductCategory } from './model';

@InputType()
export class ProductCategoryInput implements Partial<ProductCategory> {
  @Field()
  @Length(1, 50)
  title: string;
}

// @InputType()
// export class CreateProductCategoryInput extends ProductCategoryInput {}

// @InputType()
// export class UpdateProductCategoryInput extends ProductCategoryInput {}
