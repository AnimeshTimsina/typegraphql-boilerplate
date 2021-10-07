import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { DuplicateRecordError } from '../../shared/types/graphql-errors';
import { deleteResponse, USER_ROLE } from '../../shared/types/interface';
import { Customer } from '../Customer/model';
import { CreateUserInput, UpdateUserInput } from './input';
import { User } from './model';

@Service()
export class UserService {
  getAll = async (): Promise<User[]> => {
    return await User.find();
  };

  getOne = async (id: string): Promise<User | undefined> => {
    const user = await User.findOne({
      where: { id },
      relations: ['customersCreated'],
    });

    return user;
  };

  getCreatedCustomers = async (id: string): Promise<Customer[] | undefined> => {
    const user = await this.getOne(id);
    return user?.customersCreated ?? [];
  };

  getByEmail = async (email: string): Promise<User | undefined> => {
    const user = await User.findOne({
      where: { email },
      relations: ['customersCreated'],
    });

    return user;
  };

  create = async (createUserInput: CreateUserInput): Promise<User> => {
    const user = await User.findOne({
      where: { email: createUserInput.email },
    });
    if (user)
      throw new DuplicateRecordError(
        `User with email "${createUserInput.email}" already exists!`,
      );
    return await User.create({
      ...createUserInput,
      password: await hash(createUserInput.password, 12),
    }).save();
  };

  delete = async (id: string): Promise<deleteResponse<string | null>> => {
    try {
      await User.delete({
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
    updateUserInput: UpdateUserInput,
  ): Promise<User> => {
    const userFound = await User.findOne({
      where: { id },
      relations: ['customersCreated'],
    });
    if (!userFound) {
      throw new Error(`The user with id: ${id} does not exist!`);
    }
    Object.assign(userFound, updateUserInput);
    const updatedUser = await userFound.save();
    return updatedUser;
  };

  incrementTokenNumber = (user: User) => {
    user.tokenVersion = user.tokenVersion + 1;
    user.save();
  };

  isAdmin = (user: User): boolean => {
    return user.role === USER_ROLE.ADMIN;
  };

  isClient = (user: User): boolean => {
    return user.role === USER_ROLE.CLIENT;
  };

  isStaff = (user: User): boolean => {
    return user.role === USER_ROLE.STAFF;
  };
}
