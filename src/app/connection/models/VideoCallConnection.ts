import {BehaviorSubject, Observable} from 'rxjs';
import {Connection, ConnectionType} from './Connection';
import {promise} from 'protractor';

export class VideoCallConnection implements Connection {
  private rtcpeerConnection: any;
  private localStream: BehaviorSubject<any> = new BehaviorSubject(null);

  private remoteStream: BehaviorSubject<any> = new BehaviorSubject(new MediaStream());
  // public messageHandler: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(rtcpeerConnection: any) {
    this.rtcpeerConnection = rtcpeerConnection;
    console.log(rtcpeerConnection)
    rtcpeerConnection.ontrack = (event) => {
      console.log('received ontrack', event);
      console.log('received event.currentTarget.connectionState', event.currentTarget.connectionState);
// const currentStream  =remoteStream.getValue();
//       currentStream.addTrack(event.track);
      this.remoteStream.next(event.streams[0]) ;

    };
  }
  public getLocalStream(): Observable<any> {
    return this.localStream.asObservable();
  }
  public getRemoteStream(): Observable<any> {
    return this.remoteStream.asObservable();
  }
  public connectionStatusChanged(): Observable<string> {
    const replaySubject = new BehaviorSubject<string>('unknown');
    this.rtcpeerConnection.onconnectionstatechange = (event) => {
      replaySubject.next(event.currentTarget.connectionState);
    };
    return replaySubject.asObservable();

  }


  public async createOffer(): Promise<string> {


    await this.addVideoCallStream(this.rtcpeerConnection);
    const options = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    };
    const offer = await this.rtcpeerConnection.createOffer(options);
    await this.rtcpeerConnection.setLocalDescription(offer);



    return new Promise<string>((resolve, reject) => {
      this.rtcpeerConnection.onicecandidate = (event) => {

        if (!event.candidate) {
          const s = JSON.stringify(this.rtcpeerConnection.localDescription);
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
    await this.addVideoCallStream(this.rtcpeerConnection);
    console.log(this.rtcpeerConnection);
  }


  public async createAnswer():Promise<string> {
    const answer = await this.rtcpeerConnection.createAnswer();
    await this.rtcpeerConnection.setLocalDescription(answer);
    return JSON.stringify(answer);
  }

  public async acceptAnswer(answer) {
    await this.rtcpeerConnection.setRemoteDescription(JSON.parse(answer));

  }


  close() {

    const localStream = this.localStream.getValue();
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }


    const remoteStream = this.remoteStream.getValue();
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
    }





    this.rtcpeerConnection.close();
  }


  getConnectionType(): ConnectionType {
    return ConnectionType.VIDEOCALL;
  }

  async addVideoCallStream(rtcpeerConnection: any) {

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
   // rtcpeerConnection.addStream(stream);
     stream.getTracks().forEach(track => rtcpeerConnection.addTrack(track, stream));
    this.localStream.next(stream);

  }
}
