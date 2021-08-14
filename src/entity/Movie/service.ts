import { Service } from 'typedi';
import { CreateMovieInput, UpdateMovieInput } from './input';
import { Movie } from './model';

@Service()
export class MovieService {
  getAll = async (): Promise<Movie[]> => {
    return await Movie.find();
  };

  test = async () : Promise<string> => {
      return 's';
  }

  getOne = async (id: number): Promise<Movie | undefined> => {
    const movie = await Movie.findOne({ where: { id } });

    if (!movie) {
      throw new Error(`The movie with id: ${id} does not exist!`);
    }
    return movie;
  };

  create = async (createMovieInput: CreateMovieInput): Promise<Movie> => {
    return await Movie.create(createMovieInput).save();
  };

  update = async (
    id: number,
    updateMovieInput: UpdateMovieInput,
  ): Promise<Movie> => {
    const movieFound = await Movie.findOne({ where: { id } });

    if (!movieFound) {
      throw new Error(`The movie with id: ${id} does not exist!`);
    }

    Object.assign(movieFound, updateMovieInput);
    const updatedMovie = await movieFound.save();

    return updatedMovie;
  };

  delete = async (id: number): Promise<boolean> => {
    const movieFound = await Movie.findOne({ where: { id } });

    if (!movieFound) {
      throw new Error(`The movie with id: ${id} does not exist!`);
    }

    await movieFound.remove();

    return true;
  };
}