import {Injectable} from '@angular/core';
import {Connection} from './Connection';

@Injectable({
  providedIn: 'root'
})
export class WebrtcConfigService {

  private _connection:Connection;
  private _name:string;


  constructor() { }

  public get connection():Connection{
    return this._connection;
  }

  public set connection(connection:Connection){
    this._connection = connection;


  }
  public get name():string{
    return this._name;
  }
  public set name(name:string){
    this._name = name;
  }

}
