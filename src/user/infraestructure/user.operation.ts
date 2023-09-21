import { ResponseDto } from '../../shared/helpers/response.dto';
import Result from '../../shared/interfaces/result.interface';
import UserRepository from '../application/user.repository';
import { UserModel } from '../domain/user.model';

export default class UserOperation
  implements UserRepository
{
  private allUsers : UserModel[] = [];
  constructor() {
    
  }

  async list(
    where: object = {},
    relations: string[] = [],
    order: object = {},
  ): Promise<Result<UserModel>> {
    return new Promise((resolve, reject) => {
      const data =[]
      // ? darle la forma del result
      resolve(ResponseDto.format('_', this.allUsers));

    })
  
  }
  async getOne(
    where: object = {},
    relations: string[] = [],
  ): Promise<Result<UserModel>> {
    const data = {}
    return ResponseDto.format('-', data)
    // ? darle la forma del result
    // return new Promise((resolve, reject) => {

    //   resolve();

    // })
  }

  async insert(entity: UserModel): Promise<Result<UserModel>> {
    
    this.allUsers = [
      ...this.allUsers, entity
    ]

    return ResponseDto.format('', this.allUsers);
  }

  async update(
    entity: Partial<UserModel>,
    where: object = {},
    relations: string[] = [],
  ): Promise<Result<UserModel>> {
   
    let recordToUpdate = this.allUsers.find((user)=>user.dni === entity.dni);
    let recordUpdated = Object.assign(entity,recordToUpdate)
    
    return ResponseDto.format('-', this.allUsers);
  }
  async delete(where: object): Promise<Result<UserModel>> {
    throw new Error('not implemented');
  }

}
