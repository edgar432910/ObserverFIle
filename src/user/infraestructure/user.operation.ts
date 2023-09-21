import { IError } from '../../shared/helpers/errors.helpers';
import { ResponseDto } from '../../shared/helpers/response.dto';
import Result from '../../shared/interfaces/result.interface';
import UserRepository from '../application/user.repository';
import { UserModel } from '../domain/user.model';

export default class UserOperation
  implements UserRepository {
  private allUsers: UserModel[] = [];
  constructor() {

  }

  async list(
    where: object = {},
    relations: string[] = [],
    order: object = {},
  ): Promise<Result<UserModel>> {
    return new Promise((resolve, reject) => {
      // ? darle la forma del result
      const listUser = this.allUsers.filter((user) => user.active).map((user) => {
        return {
          dni: user.dni,
          name: user.name,
          lastname: user.lastname
        }
      })
      resolve(ResponseDto.format('_', listUser));

    })

  }
  async getOne(
    where: any = {},
    relations: string[] = [],
  ): Promise<Result<UserModel>> {
    return new Promise((resolve, reject) => {
      const userMatched = this.allUsers.find(user => user.dni == where.dni)
      if (!userMatched) {
        const error: IError = new Error('Not Found');
        error.status = 404;
        reject(error)

      }
      const userMatchedToShow = {
        dni: userMatched?.dni,
        name: userMatched?.name,
        lastname: userMatched?.lastname
      }
      resolve(ResponseDto.format('-', userMatchedToShow));
    })


  }

  async insert(entity: UserModel): Promise<Result<UserModel>> {
    return new Promise((resolve, reject) => {
      
      this.allUsers = [
        ...this.allUsers, entity
      ]
      resolve( ResponseDto.format('', this.allUsers))
    })

   
  }

  async update(
    entity: Partial<UserModel>,
    where: any = {},
    relations: string[] = [],
  ): Promise<Result<UserModel>> {
    return new Promise((resolve, reject) => {
      let recordToUpdate: any = this.allUsers.find((user) => user.dni === where.dni);
      if (!recordToUpdate) {
        const error: IError = new Error('Not Exist User');
        error.status = 404;
        reject(error)
      }
      let recordUpdated = Object.assign(recordToUpdate, entity)
      this.allUsers = this.allUsers.map((user) => {
        if (user.dni == where.dni) return recordUpdated
        return user
      })
      if (!entity.dni) resolve(ResponseDto.format('-', recordToUpdate))
      resolve(ResponseDto.format('-', entity))
    })

  }
  async delete(where: object): Promise<Result<UserModel>> {
    throw new Error('not implemented');
  }

}
