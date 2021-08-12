import { Length } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
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

  @InputType()
export class CreateMovieInput implements Partial<Movie> {
  @Field()
  @Length(2, 50)
  title: string;

  @Field()
  @Length(10, 250)
  description: string;

  @Field(_ => [String])
  actors: string[];

  @Field({ nullable: true })
  releaseYear: string;
}

@InputType()
export class UpdateMovieInput implements Partial<Movie> {
  @Field({ nullable: true })
  @Length(2, 50)
  title?: string;

  @Field({ nullable: true })
  @Length(10, 250)
  description?: string;

  @Field(_ => [String], { nullable: true })
  actors?: string[];

  @Field({ nullable: true })
  releaseYear?: string;
}