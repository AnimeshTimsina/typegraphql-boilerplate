import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../Product/model';

@ObjectType({ description: 'The product category model' })
@Entity({ name: 'product_category' })
export class ProductCategory extends BaseEntity {
  @Field((_) => ID)
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Field()
  @Column('varchar', { length: 50, unique: true })
  title: string;

  @Field((_) => [Product])
  @OneToMany((_) => Product, (product) => product.category)
  products: [Product];
}
