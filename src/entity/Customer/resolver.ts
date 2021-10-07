import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Service } from 'typedi';
import { authService } from '../../auth/services';
import { MyContext } from '../../auth/types';
import { DeleteResponse } from '../../shared/types/graphql-types';
import { deleteResponse } from '../../shared/types/interface';
import { CustomerInput } from './input';
import { Customer } from './model';
import { CustomerService } from './service';

@Service()
@Resolver((_) => Customer)
export class CustomerResolver {
  constructor(private readonly service: CustomerService) {}

  @Query((_) => [Customer], { nullable: true })
  //   @UseMiddleware(authService.isAuthenticated)
  async allCustomers(): Promise<Customer[]> {
    return await this.service.getAll();
  }

  @Query((_) => Customer, { nullable: true })
  //   @UseMiddleware(authService.isAuthenticated)
  async getCustomer(
    @Arg('id', () => ID!) id: string,
  ): Promise<Customer | undefined> {
    return await this.service.getOne(id);
  }

  @Mutation((_) => Customer)
  @UseMiddleware(authService.isAuthenticated)
  async createCustomer(
    @Arg('CustomerInput') input: CustomerInput,
    @Ctx() { user }: MyContext,
  ): Promise<Customer> {
    return await this.service.create(input, user!);
  }

  @Mutation((_) => DeleteResponse)
  //   @UseMiddleware(authService.userIsAdmin)
  async deleteCustomer(
    @Arg('id', () => ID!) id: string,
  ): Promise<deleteResponse<string | null>> {
    const deleted = await this.service.delete(id);
    if (!deleted.success) throw "Customer with this id doesn't exist";
    return deleted;
  }

  @Mutation((_) => Customer)
  //   @UseMiddleware(authService.userIsAdmin)
  async updateCustomer(
    @Arg('id', () => ID!) id: string,
    @Arg('CustomerInput') input: CustomerInput,
  ): Promise<Customer> {
    return await this.service.update(id, input);
  }
}
