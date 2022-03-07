import {BehaviorSubject, Observable} from 'rxjs';

export class MediaConnection {
  private rtcpeerConnection: any;

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

  }



  public async createAnswer() {
    const answer = await this.rtcpeerConnection.createAnswer();
    await this.rtcpeerConnection.setLocalDescription(answer);
    return JSON.stringify(answer);
  }

  public async acceptAnswer(answer) {
    await this.rtcpeerConnection.setRemoteDescription(JSON.parse(answer));

  }





  close() {
    this.rtcpeerConnection.close();
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
}
