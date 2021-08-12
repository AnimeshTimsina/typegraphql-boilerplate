import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Service } from 'typedi';
import { CreateMovieInput, Movie, UpdateMovieInput } from '../models/entity/Movie';
import { MovieService } from '../models/services/movieService';

@Service()
@Resolver(_ => Movie)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query((_) => [Movie], { nullable: true })
  async getMovies(): Promise<Movie[]> {
    return await this.movieService.getAll();
  }

  @Query((_) => Movie, { nullable: true })
  async getMovie(@Arg('id') id: number): Promise<Movie | undefined> {
    return await this.movieService.getOne(id);
  }

  @Mutation((_) => Movie)
  async addMovie(
    @Arg('MovieInput') createMovieInput: CreateMovieInput,
  ): Promise<Movie> {
    return await this.movieService.create(createMovieInput);
  }

  @Mutation((_) => Movie)
  async updateMovie(
    @Arg('id') id: number,
    @Arg('MovieInput') updateMovieInput: UpdateMovieInput,
  ): Promise<Movie> {
    return await this.movieService.update(id, updateMovieInput);
  }

  @Mutation((_) => Boolean)
  async deleteMovie(@Arg('id') id: number): Promise<boolean> {
    return await this.movieService.delete(id);
  }
}