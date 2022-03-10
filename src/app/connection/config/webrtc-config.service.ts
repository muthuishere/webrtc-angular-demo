import {Injectable} from '@angular/core';
import {DataConnection} from '../models/DataConnection';
import {WebrtcConnectionService} from '../services/webrtc-connection.service';
import {Connection, ConnectionType} from '../models/Connection';
import {VideoCallConnection} from '../models/VideoCallConnection';

@Injectable({
  providedIn: 'root'
})
export class WebrtcConfigService {

  private _connection: Connection;

  private _name: string;


  constructor(public webrtcConnectionService: WebrtcConnectionService) { }

  public get connection(): Connection{
    return this._connection;
  }

  public set connection(connection: Connection){
    this._connection = connection;


  }
  public get name(): string{
    return this._name;
  }
  public set name(name: string){
    this._name = name;
  }

  public createConnection(currentType: string): Connection {


    if(currentType === 'videocall')
      this._connection = this.webrtcConnectionService.createMediaConnection();
    else if(currentType === 'text')
      this._connection = this.webrtcConnectionService.createDataConnection();

    return this.connection;
  }

  asDataConnection(): DataConnection {
    return this.connection as unknown as DataConnection;
  }
  asMediaConnection(): VideoCallConnection {
    return this.connection as unknown as VideoCallConnection;
  }
}
