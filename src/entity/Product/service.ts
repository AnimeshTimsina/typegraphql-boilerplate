import { Service } from 'typedi';
import { DuplicateRecordError } from '../../shared/types/graphql-errors';
import { deleteResponse } from '../../shared/types/interface';
import { ProductCategory } from '../Category/model';
import { ProductInput, UpdateProductInput } from './input';
import { Product } from './model';

@Service()
export class ProductService {
  getAll = async (): Promise<Product[]> => {
    return await Product.find({ relations: ['category'] });
  };

  getOne = async (id: string): Promise<Product | undefined> => {
    return await Product.findOne({ where: { id }, relations: ['category'] });
  };

  getCategory = async (
    productId: string,
  ): Promise<ProductCategory | undefined> => {
    const product = await this.getOne(productId);
    return product?.category;
  };

  create = async (input: ProductInput): Promise<Product> => {
    const cat = await Product.findOne({
      where: { title: input.title },
      relations: ['category'],
    });
    if (cat)
      throw new DuplicateRecordError(
        `Product with title "${input.title}" already exists!`,
      );
    const category = await ProductCategory.findOne({
      where: { id: input.categoryID },
      relations: ['products'],
    });
    if (!category) throw `Category with id: ${input.categoryID} doesn't exist`;
    const needed = (({ photo, description, price, title }) => ({
      photo,
      description,
      price,
      title,
    }))(input);
    return await Product.create({
      ...needed,
      category: category,
    }).save();
  };

  delete = async (id: string): Promise<deleteResponse<string | null>> => {
    try {
      await Product.delete({
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

  update = async (id: string, input: UpdateProductInput): Promise<Product> => {
    let productFound = await Product.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!productFound) {
      throw new Error(`The product with id: ${id} does not exist!`);
    }
    const category = input.categoryID
      ? await ProductCategory.findOne({
          where: { id: input.categoryID },
          relations: ['products'],
        })
      : productFound.category;
    let obtained = Object.entries(input).filter(
      (e) => e[1] != undefined || e[1] != null,
    );
    let toInsert = {} as any;
    obtained.forEach((entry) => {
      if (Object.keys(productFound!).includes(entry[0]))
        toInsert[entry[0]] = entry[1];
    });
    Object.assign(productFound, {
      ...toInsert,
      category: category,
    });
    return await productFound.save();
  };
}
