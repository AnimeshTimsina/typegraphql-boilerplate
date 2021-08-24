import { Service } from 'typedi';
import { DuplicateRecordError } from '../../shared/types/graphql-errors';
import { deleteResponse } from '../../shared/types/interface';
import { Product } from '../Product/model';
import { ProductCategoryInput } from './input';
import { ProductCategory } from './model';

@Service()
export class ProductCategoryService {
  getAll = async (): Promise<ProductCategory[]> => {
    return await ProductCategory.find();
  };

  getOne = async (id: string): Promise<ProductCategory | undefined> => {
    return await ProductCategory.findOne({
      where: { id },
      relations: ['products'],
    });
  };

  getByTitle = async (title: string): Promise<ProductCategory | undefined> => {
    return await ProductCategory.findOne({
      where: { title },
      relations: ['products'],
    });
  };

  getProducts = async (id: string): Promise<Product[] | undefined> => {
    const category = await this.getOne(id);
    return category?.products ?? [];
  };

  create = async (input: ProductCategoryInput): Promise<ProductCategory> => {
    const cat = await ProductCategory.findOne({
      where: { title: input.title },
    });
    if (cat)
      throw new DuplicateRecordError(
        `Category with title "${input.title}" already exists!`,
      );
    return await ProductCategory.create({
      ...input,
      title: input.title,
    }).save();
  };

  delete = async (id: string): Promise<deleteResponse<string | null>> => {
    try {
      await ProductCategory.delete({
        id: id,
      });
      return {
        id: id,
        success: true,
      };
    } catch (err) {
      return {
        id: null,
        success: false,
      };
    }
  };

  update = async (
    id: string,
    input: ProductCategoryInput,
  ): Promise<ProductCategory> => {
    const categoryFound = await ProductCategory.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!categoryFound) {
      throw new Error(`The category with id: ${id} does not exist!`);
    }
    Object.assign(categoryFound, input);
    return await categoryFound.save();
  };
}
