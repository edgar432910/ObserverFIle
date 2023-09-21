
import { Request, Response } from 'express';
import { UserModel } from '../domain/user.model';
import UserUseCase from '../application/user.usecase';

export default class UserController {
  constructor(private useCase: UserUseCase) {}

  async list(req: Request, res: Response) {
    const result = await this.useCase.list({}, [], {
      lastname: 'ASC',
      name: 'ASC',
    });
    res.json(result);
  }
  async getOne(req: Request, res: Response) {
    const where = { dni: +req.params.id };
    const result = await this.useCase.getOne(where);
    res.json(result);
  }


  async insert(req: Request, res: Response) {
    const body = req.body;
    const user: Partial<UserModel> = {
      name: body.name,
      lastname: body.lastname,
      dni:body.dni
    };
    const result = await this.useCase.insert(user);
    res.json(result);
  }
  async update(req: Request, res: Response) {
    const body = req.body;
    const where = { dni: req.params.id };

    const result = await this.useCase.update(body, where);
    res.json(result);
  }
  async delete(req: Request, res: Response) {
    const where = { dni: req.params.id };
    const result = await this.useCase.delete(where);
    res.json(result);
  }
}
