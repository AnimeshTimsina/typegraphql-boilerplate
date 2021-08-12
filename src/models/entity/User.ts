import {
    Entity,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
  } from 'typeorm';
import { USER_ROLE } from '../../auth/interface';
  
  @Entity({name:'auth_user'})
  export class User extends BaseEntity {  
    @PrimaryColumn()
    uid: string;
  
    @Column("varchar", { length: 50 })
    firstName: string;
  
    @Column("varchar", { length: 50 })
    lastName: string;
  
    @Column({
        type: "enum",
        enum: USER_ROLE
    })
    role: USER_ROLE;
  
    @CreateDateColumn()
    updatedAt: Date;
  
    @UpdateDateColumn()
    createdAt: Date;
  }