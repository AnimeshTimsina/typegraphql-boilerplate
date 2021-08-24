import {
  Arg,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Service } from 'typedi';
import { DeleteResponse } from '../../shared/types/graphql-types';
import { deleteResponse } from '../../shared/types/interface';
import { ProductInput, UpdateProductInput } from './input';
import { Product } from './model';
import { ProductService } from './service';

@Service()
@Resolver((_) => Product)
export class ProductResolver {
  constructor(private readonly service: ProductService) {}

  @Query((_) => [Product], { nullable: true })
  //   @UseMiddleware(authService.isAuthenticated)
  async allProducts(): Promise<Product[]> {
    return await this.service.getAll();
  }

  @Query((_) => Product, { nullable: true })
  //   @UseMiddleware(authService.isAuthenticated)
  async getProduct(
    @Arg('id', () => ID!) id: string,
  ): Promise<Product | undefined> {
    return await this.service.getOne(id);
  }

  @Mutation((_) => Product)
  //   @UseMiddleware(authService.userIsAdmin)
  async createProduct(
    @Arg('ProductInput') input: ProductInput,
  ): Promise<Product> {
    return await this.service.create(input);
  }

  @Mutation((_) => DeleteResponse)
  //   @UseMiddleware(authService.userIsAdmin)
  async deleteProduct(
    @Arg('id', () => ID!) id: string,
  ): Promise<deleteResponse<string | null>> {
    const deleted = await this.service.delete(id);
    if (!deleted.success) throw "Product with this id doesn't exist";
    return deleted;
  }

  @Mutation((_) => Product)
  //   @UseMiddleware(authService.userIsAdmin)
  async updateProduct(
    @Arg('id', () => ID!) id: string,
    @Arg('input') input: UpdateProductInput,
  ): Promise<Product> {
    return await this.service.update(id, input);
  }

  @FieldResolver()
  category(@Root() product: Product) {
    return this.service.getCategory(product.id);
  }
}
