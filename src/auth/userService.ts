import { Service } from 'typedi';
import { User } from '../models/entity/User';


@Service()
export class UserService {
  getAll = async (): Promise<User[]> => {
    return await User.find();
  };


  getOne = async (uid: string): Promise<User | undefined> => {
    const user = await User.findOne({ where: { uid } });

    if (!user) {
      throw new Error(`The user with id: ${uid} does not exist!`);
    }
    return user;
  };

}