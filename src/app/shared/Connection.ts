import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';

export class Connection {
  private rtcpeerConnection: any;
  public channel: any;
  public messageHandler: BehaviorSubject<string> = new BehaviorSubject('');



  public getMessageHandler(): Observable<string> {
    return this.messageHandler.asObservable();
  }

  constructor(rtcpeerConnection: any) {
    this.rtcpeerConnection = rtcpeerConnection;

  }

  public connectionStatusChanged():Observable<string> {
    const replaySubject = new BehaviorSubject<string>("unknown");
    // replaySubject.next("unknown")
    this.rtcpeerConnection.onconnectionstatechange = (event) => {
      console.log('onconnectionstatechange event handler', event);
      console.log('onconnectionstatechange event handler', event.currentTarget.connectionState);

      replaySubject.next(event.currentTarget.connectionState);
    };
    return replaySubject.asObservable();

  }


  public async createOfferForText() {

    this.createDataChannel();
    const offer = await this.rtcpeerConnection.createOffer();
    await this.rtcpeerConnection.setLocalDescription(offer);


    return new Promise<string>((resolve, reject) => {
      this.rtcpeerConnection.onicecandidate = (event) => {

        if (!event.candidate) {
          let s = JSON.stringify(this.rtcpeerConnection.localDescription);
          console.log('inner createOfferForText =>' + s);
          resolve(s);

        }
      };

      this.rtcpeerConnection.onicecandidateerror = (event) => {
        console.log('onicecandidateerror', event);
        reject(event);

      };
    });


  }

  public async joinForText(offer) {
    await this.rtcpeerConnection.setRemoteDescription(JSON.parse(offer));
    this.setupMessageHandlersForText();
  }

  private setupMessageHandlersForText() {
    this.rtcpeerConnection.ondatachannel = (event) => {
      console.log('ondatachannel');
      this.channel = event.channel;
      // channel.onopen = event => console.log('onopen', event);
      // channel.onmessage = event => console.log('onmessage', event);
      this.channel.onmessage = (event) => {
        console.log('onmessage', event);
        this.messageHandler.next(event.data);
      };
    };
  }

  public async createAnswer() {
    const answer = await this.rtcpeerConnection.createAnswer();
    await this.rtcpeerConnection.setLocalDescription(answer);
    console.log(this.rtcpeerConnection);
    return JSON.stringify(answer);
  }

  public async acceptAnswer(answer) {
    await this.rtcpeerConnection.setRemoteDescription(JSON.parse(answer));
    console.log(this.rtcpeerConnection);
    console.log('acceptAnswer completed');
  }

  public async createDataChannel() {
    this.channel = this.rtcpeerConnection.createDataChannel('data');
    this.channel.onmessage = (event) => {
      console.log('starter onmessage', event);
      this.messageHandler.next(event.data);
    };

  }


  sendMessage(value) {
    this.channel.send(value);
  }
}
