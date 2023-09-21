import Result from '../../shared/interfaces/result.interface';
import { UserModel } from '../../user/domain/user.model';
import UserRepository from './user.repository';
import yenv from 'yenv';

const env = yenv();

export default class UserUseCase {
  constructor(
    public repository: UserRepository
  ) {
    
  }
  list(
    where: object = {},
    relations: string[] = [],
    order: object = {},
  ): Promise<Result<UserModel>> {
    where = { ...where, active: true };
   
    return this.repository.list(where, relations, order);
  }

  getOne(where: object = {}, relations: string[] = []): Promise<Result<UserModel>> {
    where = { ...where, active: true };
    return this.repository.getOne(where, relations);
  }
  insert(entity: Partial<UserModel>): Promise<Result<UserModel>> {
    return this.repository.insert(entity);
  }
  update(
    entity: Partial<UserModel>,
    where: object = {},
    relations: string[] = [],
  ): Promise<Result<UserModel>> {
    return this.repository.update(entity, where, relations);
  }
  delete(where: object): Promise<Result<UserModel>> {
    const entity: any = { active: false };
    return this.repository.update(entity, where, []);
  }


}
