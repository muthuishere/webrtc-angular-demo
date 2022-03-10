import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {DataConnection} from '../models/DataConnection';
import {VideoCallConnection} from '../models/VideoCallConnection';

@Injectable({
  providedIn: 'root'
})
export class WebrtcConnectionService {
  private currentWindow: any;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.currentWindow = this.document.defaultView;

  }
  public createRtcPeerConnection(): any {

    const options = null;
    const rtcpeerConnection = new this.currentWindow.RTCPeerConnection(options);
    rtcpeerConnection.onconnectionstatechange = (event) => {
      console.log('onconnectionstatechange', event);
    };
    return rtcpeerConnection;

  }

  public createDataConnection(): DataConnection {
    /*
stun.l.google.com:19302
stun1.l.google.com:19302
stun2.l.google.com:19302
stun3.l.google.com:19302
stun4.l.google.com:19302
stun01.sipphone.com
stun.ekiga.net
stun.fwdnet.net
stun.ideasip.com
stun.iptel.org
stun.rixtelecom.se
stun.schlund.de
stunserver.org
stun.softjoys.com
stun.voiparound.com
stun.voipbuster.com
stun.voipstunt.com
stun.voxgratia.org
stun.xten.com
*/
    // const options = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]};

    const rtcpeerConnection = this.createRtcPeerConnection();
    return new DataConnection(rtcpeerConnection);
  }
  public createMediaConnection(): VideoCallConnection {

    // const options = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]};
    const rtcpeerConnection = this.createRtcPeerConnection();
    return new VideoCallConnection(rtcpeerConnection);
  }



}
