import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockSignallingServerService {

  constructor(private httpClient:HttpClient) { }

  async putOffer(offer) {
    return this.httpClient.put(' http://localhost:3000/posts/1', {
      offer: offer
    }).toPromise();
  }
  async getOffer() {
    return this.httpClient.get(' http://localhost:3000/posts/1' )
      .pipe(
        map(data => data['offer'])
      )
      .toPromise();
  }
  async putAnswer(answer) {
    return this.httpClient.put(' http://localhost:3000/posts/2', {
      answer: answer
    }).toPromise();
  }
  async getAnswer() {
    return this.httpClient.get(' http://localhost:3000/posts/2' )
      .pipe(
        map(data => data['answer'])
      )
      .toPromise();
  }

}
