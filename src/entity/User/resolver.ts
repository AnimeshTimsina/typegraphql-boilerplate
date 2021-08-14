import { Query, Resolver, Mutation, Arg, UseMiddleware, Ctx, ID } from 'type-graphql';
import { Service } from 'typedi';
import { UserService } from './service';
import { CreateUserInput } from './input';
import { User } from './model';
import { DeleteResponse } from '../../shared/types/graphql-types';
import { deleteResponse } from '../../shared/types/interface';
import {  authService } from '../../auth/services';
import { MyContext } from '../../auth/types';


@Service()
@Resolver(_ => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService
    ) {}

  @Query((_) => [User], { nullable: true })
  @UseMiddleware(authService.userIsAdmin)
  async allUsers(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Query((_) => User, { nullable: true })
  async getUser(@Arg('id',() => ID!) id: string): Promise<User | undefined> {
    return await this.userService.getOne(id);
  }

  @Mutation((_) => User)
  async registerUser(
    @Arg('UserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.create(createUserInput);
  }


  @Mutation((_) => DeleteResponse)
  async deleteUser(@Arg('id',() => ID!) id: string): Promise<deleteResponse<string|null>> {
    const deleted = await this.userService.delete(id);
    if (!deleted.success) throw('User with this id doesn\'t exist')
    return deleted
  }

  @Query((_) => User)
  @UseMiddleware(authService.isAuthenticated)
  async me(
    @Ctx(){user}:MyContext
  ): Promise<User | undefined> {
    return await this.userService.getOne(user!.id);
  }
}