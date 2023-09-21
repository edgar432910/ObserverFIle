import * as chokidar from 'chokidar';
import fs from 'fs';
import  es from 'event-stream';
import UserUseCase from '../user/application/user.usecase';
import { UserModel } from '../user/domain/user.model';
const folderToWatch = __dirname + '/path';
const delayToAttempts = 10000;
const maxAttempts = 3;
export class FileUseCase{
    constructor(private userUseCase:UserUseCase){
        this.watchPath()
    }
    private watchPath(){
        const watcher = chokidar.watch( folderToWatch, {
            persistent: true
        }); 
        watcher
        .on('add', (filePath) => {
            const nameFile = filePath.split('/').slice(-1)
            console.log(`a file has been uploaded : ${nameFile}`);
            const isCsv = filePath.endsWith('.csv') ;
            if(!isCsv) return;
            this.saveValidDocument(filePath)
        })
        .on('error', (error) => {
            console.error(error)
        })
    }
    private saveValidDocument(PATH_FILE:string, attempts:number = 0):Promise<void>{
        return new Promise((resolve, reject) => {
            if(attempts>=maxAttempts){
                const nameFile = PATH_FILE.split('/').slice(-1)
                reject(new Error(`Max Attempts exceeded with this file: ${nameFile}`))
                return ;
            }

            fs.createReadStream(PATH_FILE, "utf-8")
            .pipe(es.split())
            .on('data',async(data)=>{
                const value = data.split(',');
                const user:UserModel = {
                    dni: value[0],
                    name:  value[1],
                    lastname:  value[2],
                    active: true
                }
                this.userUseCase.insert(user)
            })
            .on('end', () => {
                resolve()
            })
            .on('error', (error) => {
                setTimeout(() => {
                    this.saveValidDocument(PATH_FILE, attempts + 1)
                        .then(resolve)
                        .catch(reject)
                }, delayToAttempts);
            })
        })
    }

}