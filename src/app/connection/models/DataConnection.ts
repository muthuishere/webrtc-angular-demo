import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {Connection, ConnectionType} from './Connection';



/*
  //connectionStatusChanged
  //createOffer
  //acceptAnswer
  //join
  // createAnswer
 */
export class DataConnection implements Connection {
  private rtcpeerConnection: any;
  public channel: any;
  public messageHandler: BehaviorSubject<any> = new BehaviorSubject('');
  private connectionStatus = new BehaviorSubject<string>('unknown');




  public getMessageHandler(): Observable<any> {
    return this.messageHandler.asObservable();
  }

  constructor(rtcpeerConnection: any) {
    this.rtcpeerConnection = rtcpeerConnection;

  }

  connectionStatusChanged(): Observable<string> {

    this.rtcpeerConnection.onconnectionstatechange = (event) => {
      this.connectionStatus.next(event.currentTarget.connectionState);
    };
    return this.connectionStatus.asObservable();

  }


  async createOffer() {

    const data="data"
    this.createDataChannelWithName(data);
    const options = null
    const offer = await this.rtcpeerConnection.createOffer(options);
    await this.rtcpeerConnection.setLocalDescription(offer);


    return new Promise<string>((resolve, reject) => {
      this.rtcpeerConnection.onicecandidate = (event) => {

        if (!event.candidate) {
          let s = JSON.stringify(this.rtcpeerConnection.localDescription);
          // console.log('inner createOffer =>' + s);
          resolve(s);

        }
      };

      this.rtcpeerConnection.onicecandidateerror = (event) => {
        console.log('onicecandidateerror', event);
        reject(event);

      };
    });


  }

  async join(offer):Promise<void> {
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

  async createAnswer() {
    const answer = await this.rtcpeerConnection.createAnswer();
    await this.rtcpeerConnection.setLocalDescription(answer);
    return JSON.stringify(answer);
  }

  async acceptAnswer(answer) {
    await this.rtcpeerConnection.setRemoteDescription(JSON.parse(answer));

  }

  public async createDataChannelWithName(channelName) {
    const channel = this.rtcpeerConnection.createDataChannel(channelName);
    this.setupMessageHandler(channel);

  }


  sendMessage(value) {
    this.channel.send(value);
  }

  close() {
    this.rtcpeerConnection.close();
    this.connectionStatus.next('disconnected');

  }
  addStream(stream: any) {
    stream.getTracks().forEach( (track) =>{
      this.rtcpeerConnection.addTrack(track, stream);
    });
    // this.rtcpeerConnection.addStream(stream);
    console.log(this.rtcpeerConnection);
  }
  onaddstream(cb) {
    this.rtcpeerConnection.ontrack = (event) =>{
      console.log("ontrack",event)
      // cb(event.streams[0]);
      // document.getElementById("received_video").srcObject = event.streams[0];
      // document.getElementById("hangup-button").disabled = false;
    };

    this.rtcpeerConnection.onaddstream = (event) =>{
      console.log("onaddstream",event)
      cb(event.stream);
      // document.getElementById("received_video").srcObject = event.streams[0];
      // document.getElementById("hangup-button").disabled = false;
    };

    console.log("calling on add stream");
    // this.rtcpeerConnection.onaddstream=function(evt){
    //   console.log("onaddstream",evt)
    //   cb(evt.stream);
    // }
    // this.rtcpeerConnection.ontrack=function(evt){
    //   console.log("ontrack",evt)
    //   // cb(evt.stream);
    // }
  }

  getConnectionType(): ConnectionType {
    return ConnectionType.TEXT;
  }


}
