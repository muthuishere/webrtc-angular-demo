import {BehaviorSubject, Observable} from 'rxjs';

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

  public connectionStatusChanged(): Observable<string> {
    const replaySubject = new BehaviorSubject<string>('unknown');
    this.rtcpeerConnection.onconnectionstatechange = (event) => {
      replaySubject.next(event.currentTarget.connectionState);
    };
    return replaySubject.asObservable();

  }


  public async createOffer() {

    this.createDataChannel();
    const options= {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    };
    const offer = await this.rtcpeerConnection.createOffer(options);
    await this.rtcpeerConnection.setLocalDescription(offer);


    return new Promise<string>((resolve, reject) => {
      this.rtcpeerConnection.onicecandidate = (event) => {

        if (!event.candidate) {
          let s = JSON.stringify(this.rtcpeerConnection.localDescription);
          console.log('inner createOffer =>' + s);
          resolve(s);

        }
      };

      this.rtcpeerConnection.onicecandidateerror = (event) => {
        console.log('onicecandidateerror', event);
        reject(event);

      };
    });


  }

  public async join(offer) {
    await this.rtcpeerConnection.setRemoteDescription(JSON.parse(offer));
    this.rtcpeerConnection.ondatachannel = (event) => {
      this.setupMessageHandler(event.channel);
    };
  }

  private setupMessageHandler(channel) {
    this.channel = channel;
    channel.onmessage = (event) => {
      this.messageHandler.next(event.data);
    };
  }

  public async createAnswer() {
    const answer = await this.rtcpeerConnection.createAnswer();
    await this.rtcpeerConnection.setLocalDescription(answer);
    return JSON.stringify(answer);
  }

  public async acceptAnswer(answer) {
    await this.rtcpeerConnection.setRemoteDescription(JSON.parse(answer));

  }

  public async createDataChannel() {
    const channel = this.rtcpeerConnection.createDataChannel('data');
    this.setupMessageHandler(channel);

  }


  sendMessage(value) {
    this.channel.send(value);
  }
}
