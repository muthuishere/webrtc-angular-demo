import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

export class SyncService {

  public receiver = new BehaviorSubject<any>(null);
  public sender = new BehaviorSubject<any>(null);

  constructor() {

  }

  public send(msg: any): void {
    this.sender.next(msg);
  }

  public getReceiver():Observable<any> {

    return this.receiver.asObservable().pipe(
      filter(msg => msg !== null)
    );
  }
  public getSender():Observable<any> {

    return this.sender.asObservable().pipe(
      filter(msg => msg !== null)
    );
  }
}
