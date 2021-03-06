import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { USER_ROLE } from '../../shared/types/interface';
import { Customer } from '../Customer/model';

@ObjectType({ description: 'The user model' })
@Entity({ name: 'auth_user' })
export class User extends BaseEntity {
  @Field((_) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar', { length: 50 })
  firstName: string;

  @Field()
  @Column('varchar', { length: 50 })
  lastName: string;

  @Field((_) => USER_ROLE)
  @Column({
    type: 'enum',
    enum: USER_ROLE,
  })
  role: USER_ROLE;

  @Field()
  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  password: string;

  @Field((_) => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field((_) => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'int', default: 0 })
  tokenVersion: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  displayPicture?: string;

  @Field((_) => [Customer])
  @OneToMany((_) => Customer, (customer) => customer.createdBy)
  customersCreated: [Customer];
}
