import { Service } from 'typedi';
import { DuplicateRecordError } from '../../shared/types/graphql-errors';
import { deleteResponse } from '../../shared/types/interface';
import { User } from '../User/model';
import { CustomerInput } from './input';
import { Customer } from './model';

@Service()
export class CustomerService {
  getAll = async (): Promise<Customer[]> => {
    return await Customer.find({ relations: ['createdBy'] });
  };

  getOne = async (id: string): Promise<Customer | undefined> => {
    return await Customer.findOne({
      where: { id },
      relations: ['createdBy'],
    });
  };

  getByFullName = async (fullName: string): Promise<Customer | undefined> => {
    return await Customer.findOne({
      where: { fullName },
      relations: ['createdBy'],
    });
  };

  getCreatedBy = async (customerID: string): Promise<User | undefined> => {
    const customer = await this.getOne(customerID);
    return customer?.createdBy;
  };

  // getMyOrders = async (customerID: string): Promise<Order[] | undefined> => {
  //   const customer = await this.getOne(customerID);
  //   return customer?.ordersForMe;
  // };

  create = async (input: CustomerInput, createdBy: User): Promise<any> => {
    const sameVATCustomer = await Customer.findOne({
      where: { vat: input.vat },
      relations: ['createdBy'],
    });
    if (sameVATCustomer)
      throw new DuplicateRecordError('Customer with same VAT already exists');
    return await Customer.create({
      ...input,
      createdBy: createdBy,
    }).save();
  };

  delete = async (id: string): Promise<deleteResponse<string | null>> => {
    try {
      await Customer.delete({
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

  update = async (id: string, input: CustomerInput): Promise<Customer> => {
    const customerFound = await Customer.findOne({
      where: { id },
      relations: ['createdBy'],
    });
    if (!customerFound) {
      throw new Error(`The customer with id: ${id} does not exist!`);
    }
    const sameVATCustomer = input.vat
      ? await Customer.findOne({
          where: { vat: input.vat },
          relations: ['createdBy'],
        })
      : null;
    if (sameVATCustomer)
      throw new DuplicateRecordError('Customer with same VAT already exists');
    Object.assign(customerFound, input);
    return await customerFound.save();
  };
}
