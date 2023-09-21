import UserUseCase from '../../user/application/user.usecase';
import express from 'express';
import UserController from './user.controller';
import UserOperation from '../infraestructure/user.operation';
import { FileUseCase } from '../../file/file.usecase';
import ErrorHandle from '../../shared/helpers/errors.helpers';
import { schemas } from './user.schema';
import { Validators } from '../../shared/helpers/validate.middleware';


const operation = new UserOperation();
const useCase = new UserUseCase(operation);
const controller = new UserController(useCase);
const fileUseCase  = new FileUseCase(useCase)
const route = express.Router();

route.get(
  '/',
  ErrorHandle.catchError(controller.list.bind(controller)),
);

route.get('/:id', ErrorHandle.catchError(controller.getOne.bind(controller)));


route.post(
  '/',
  Validators.validate(schemas.INSERT),
  ErrorHandle.catchError(controller.insert.bind(controller)),
);
route.put('/:id', ErrorHandle.catchError(controller.update.bind(controller)));
route.delete('/:id', ErrorHandle.catchError(controller.delete.bind(controller)));

export default route;
