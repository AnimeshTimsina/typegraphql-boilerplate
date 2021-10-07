// import { Field, ID, ObjectType } from 'type-graphql';
// import {
//   BaseEntity,
//   Column,
//   CreateDateColumn,
//   Entity,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { ORDER_STATUS } from '../../shared/types/interface';
// import { Customer } from '../Customer/model';

// @ObjectType({ description: 'The order model' })
// @Entity({ name: 'order' })
// export class Order extends BaseEntity {
//   @Field((_) => ID)
//   @PrimaryGeneratedColumn('increment')
//   id: string;

//   @Field({ nullable: true })
//   @Column('varchar', { length: 500, nullable: true })
//   orderInfo?: string;

//   @Field((_) => Customer)
//   @ManyToOne((_) => Customer, (customer) => customer.ordersForMe, {
//     onDelete: 'CASCADE',
//     nullable: false,
//   })
//   placedFor: Customer;

//   @Field((_) => ORDER_STATUS)
//   @Column({
//     type: 'enum',
//     enum: ORDER_STATUS,
//   })
//   orderStatus: ORDER_STATUS;

//   @Field((_) => Date)
//   @CreateDateColumn()
//   createdAt: Date;

//   @Field((_) => Date)
//   @UpdateDateColumn()
//   updatedAt: Date;
// }
