import {Observable} from 'rxjs';

export enum ConnectionType {
  TEXT ,
  VIDEOCALL,
}


export interface Connection {
  connectionStatusChanged(): Observable<string>;

  createOffer(): Promise<string>;

  join(offer): Promise<void>;

  createAnswer(): Promise<string>;

  acceptAnswer(answer): Promise<void>;
  acceptAnswer(answer): Promise<void>;
  getConnectionType(): ConnectionType;
  close(): void;
}
