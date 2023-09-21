import http from 'http';
import { Application } from 'express';
import IBootstrap from '../bootstrap/bootstrap.interface';

import yenv from 'yenv';
const env = yenv();

export default class ServerBootstrap implements IBootstrap {
  constructor(private app: Application) {}
  initialize(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);
      server
        .listen(env.PORT)
        .on('listening', () => {
          resolve('Server is ok');
        })
        .on('error', (error) => {
          console.log(`An error`);
          reject(error);
          console.log('Server error', error);
          process.exit(1);
        });
    });
  }
  close(): void {
    process.exit(1);
  }
}
