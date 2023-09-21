import express from 'express';

import helmet from 'helmet';
import morgan from 'morgan';

import yenv from 'yenv';
import { Request, Response, Application } from 'express';
import routerUser from './user/adapter/user.route';
import ErrorHandle from './shared/helpers/errors.helpers';

const env = yenv();
const domain = env.DOMAIN;

class App {
  expressApp: Application;
  constructor() {
    this.expressApp = express();
    this.init();
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountErros();
  }

  init() {
   
  }
  mountMiddlewares() {
    this.expressApp.use(helmet());
    this.expressApp.use(morgan('dev'));
    // limitar los permisos, los accesos
    this.expressApp.use(express.urlencoded({ extended: true }));
    // middleware se llama json, se le asign a requestbody
    this.expressApp.use(express.json());
  }

  mountRoutes() {
    this.expressApp.get('/', (req: Request, res: Response) =>
      res.send('CODIGO complete before to test'),
    );
    this.expressApp.use('/users', routerUser);
 
  }
  mountErros() {
    // this.expressApp.use("**", ErrorHandle.notFound);
    this.expressApp.use(ErrorHandle.notFound);
    this.expressApp.use(ErrorHandle.generic);
  }
}
export default new App().expressApp;
