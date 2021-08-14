import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Movie } from './model';


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