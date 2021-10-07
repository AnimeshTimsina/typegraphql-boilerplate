import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../User/model';

@ObjectType({ description: 'The customer model' })
@Entity({ name: 'customer' })
export class Customer extends BaseEntity {
  @Field((_) => ID)
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Field()
  @Column('varchar', { length: 50 })
  fullName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column('varchar', { length: 100, nullable: true })
  address?: string;

  @Field({ nullable: true })
  @Column({ unique: true, nullable: true })
  vat?: number;

  @Field({ nullable: true })
  @Column('varchar', { length: 500, nullable: true })
  description?: string;

  @Field((_) => User)
  @ManyToOne((_) => User, (user) => user.customersCreated, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  createdBy?: User;

  // @Field((_) => [Order])
  // @OneToMany((_) => Order, (order) => order.placedFor, {
  //   onDelete: 'SET NULL',
  //   nullable: true,
  // })
  // ordersForMe?: [Order];

  @Field((_) => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field((_) => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
