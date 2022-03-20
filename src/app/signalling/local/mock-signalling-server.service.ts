import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

const id = 1;

@Injectable({
  providedIn: 'root'
})
export class MockSignallingServerService {

  public defaultTimeOut = 5000;

  constructor(private httpClient: HttpClient) {
  }


  async putOffer(offer) {
    return this.httpClient.put(this.getUrl(), {
      offer: offer
    }).toPromise();
  }

  private getUrl() {
    return 'http://localhost:3000/posts/' + id;
  }

  async waitAndgetOffer() {
    const result = await this.getOffer();

    if (result) {
      console.log('returning offer');
      await this.resetOffer();
      return result;
    } else {

      console.log('no offer retrying another');
      return this.executeAfterTimeout(() => this.waitAndgetOffer());
    }
  }

   async getOffer() {
    return await this.httpClient.get(this.getUrl())
      .pipe(
        map(data => data['offer'])
      )
      .toPromise();
  }

  async executeAfterTimeout(fn) {
    return new Promise<any>(resolve => {
      setTimeout(() => {
        resolve(fn());
      }, this.defaultTimeOut);
    });
  }

  async putAnswer(answer) {
    return this.httpClient.put(this.getUrl(), {
      answer: answer
    }).toPromise();
  }

  async waitAndgetAnswer() {

    const result = await this.getAnswer();

    if (result) {
      console.log('returning answer');
      await this.resetAnswer();
      return result;
    } else {

      console.log('no offer retrying another');
      return this.executeAfterTimeout(() => this.waitAndgetAnswer());
    }


  }

  async getAnswer() {
    return await this.httpClient.get(this.getUrl())
      .pipe(
        map(data => data['answer'])
      )
      .toPromise();
  }

  async resetOffer() {
    const result  = await this.httpClient.put(this.getUrl(), {
      offer: ''
    }).toPromise();
    console.log(result)
  }

  private async resetAnswer() {
    const result  = await this.httpClient.put(this.getUrl(), {
      answer: ''
    }).toPromise();
    console.log(result);
  }
}
