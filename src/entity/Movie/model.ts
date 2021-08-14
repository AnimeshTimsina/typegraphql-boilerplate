import { Field, ObjectType } from 'type-graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @ObjectType()
  @Entity({name:'movie'})
  export class Movie extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;
  
    @Field()
    @Column()
    title: string;
  
    @Field()
    @Column()
    description: string;
  
    @Field((_) => [String])
    @Column({ type: 'text', array: true })
    actors: string[];
  
    @Field()
    @Column({ nullable: true, name: 'released_at' })
    releaseYear: string;
  
    @Field()
    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @Field()
    @UpdateDateColumn({ name: 'created_at' })
    createdAt: Date;
  }

