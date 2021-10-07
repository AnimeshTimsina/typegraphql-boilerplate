import { Length, Min } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory } from '../Category/model';

@ObjectType({ description: 'The product model' })
@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @Field((_) => ID)
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Field()
  @Column('varchar', { length: 50, unique: true })
  title: string;

  @Field({ nullable: true })
  @Column('varchar', { nullable: true })
  @Length(0, 500)
  description?: string;

  @Field({ nullable: true })
  @Min(0)
  @Column('float', { nullable: true })
  price?: number;

  @Field((_) => ProductCategory)
  @ManyToOne((_) => ProductCategory, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  category: ProductCategory;

  @Field({ nullable: true })
  @Column('varchar')
  photo?: string;
}
