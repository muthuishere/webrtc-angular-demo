import {Injectable} from '@angular/core';
import {DataConnection} from '../models/DataConnection';
import {WebrtcCreatorService} from '../services/webrtc-creator.service';
import {Connection, ConnectionType} from '../models/Connection';
import {VideoCallConnection} from '../models/VideoCallConnection';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebrtcConnectorService {

  private _connection: Connection;
  private connectionStatus = new BehaviorSubject<string>("unknown");




  constructor(public webrtcConnectionService: WebrtcCreatorService) { }

  public get connection(): Connection{
    return this._connection;
  }



  public set connection(connection: Connection){

    this._connection = connection;


  }
  public getConnectionStatus(){
    return this.connectionStatus.asObservable();
  }


  public createConnection(currentType: string): Connection {
   this.closeConnection();  // close any existing connection

    if(currentType === 'videocall')
      this._connection = this.webrtcConnectionService.createMediaConnection();
    else if(currentType === 'text')
      this._connection = this.webrtcConnectionService.createDataConnection();

    this._connection.connectionStatusChanged().subscribe(status => {
      console.log("status",status);
      this.connectionStatus.next(status);
    });

   return this.connection;
  }

  asDataConnection(): DataConnection {
    return this.connection as unknown as DataConnection;
  }
  asMediaConnection(): VideoCallConnection {
    return this.connection as unknown as VideoCallConnection;
  }

  async closeConnection() {
    if(this._connection){
      this._connection.close();
      this._connection=null;
    }

  }
}
