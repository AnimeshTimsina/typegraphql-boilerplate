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
import { ProductCategoryInput } from './input';
import { ProductCategory } from './model';
import { ProductCategoryService } from './service';

@Service()
@Resolver((_) => ProductCategory)
export class ProductCategoryResolver {
  constructor(private readonly service: ProductCategoryService) {}

  @Query((_) => [ProductCategory], { nullable: true })
  //   @UseMiddleware(authService.isAuthenticated)
  async allProductCategories(): Promise<ProductCategory[]> {
    return await this.service.getAll();
  }

  @Query((_) => ProductCategory, { nullable: true })
  //   @UseMiddleware(authService.isAuthenticated)
  async getProductCategory(
    @Arg('id', () => ID!) id: string,
  ): Promise<ProductCategory | undefined> {
    return await this.service.getOne(id);
  }

  @Mutation((_) => ProductCategory)
  //   @UseMiddleware(authService.userIsAdmin)
  async createProductCategory(
    @Arg('ProductCategoryInput') input: ProductCategoryInput,
  ): Promise<ProductCategory> {
    return await this.service.create(input);
  }

  @Mutation((_) => DeleteResponse)
  //   @UseMiddleware(authService.userIsAdmin)
  async deleteProductCategory(
    @Arg('id', () => ID!) id: string,
  ): Promise<deleteResponse<string | null>> {
    const deleted = await this.service.delete(id);
    if (!deleted.success) throw "Product Category with this id doesn't exist";
    return deleted;
  }

  @Mutation((_) => ProductCategory)
  //   @UseMiddleware(authService.userIsAdmin)
  async updateProductCategory(
    @Arg('id', () => ID!) id: string,
    @Arg('ProductCategoryInput') input: ProductCategoryInput,
  ): Promise<ProductCategory> {
    return await this.service.update(id, input);
  }

  @FieldResolver()
  products(@Root() category: ProductCategory) {
    return this.service.getProducts(category.id);
  }
}
