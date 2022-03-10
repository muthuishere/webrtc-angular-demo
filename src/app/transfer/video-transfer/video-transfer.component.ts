import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VideoService} from './services/video.service';
import {WebrtcConfigService} from '../../connection/config/webrtc-config.service';
import {VideoCallConnection} from '../../connection/models/VideoCallConnection';

@Component({
  selector: 'app-video-transfer',
  templateUrl: './video-transfer.component.html',
  styleUrls: ['./video-transfer.component.scss']
})
export class VideoTransferComponent implements OnInit {

  @ViewChild('myvideo') myVideoView: ElementRef;
  @ViewChild('remoteVideo') remoteVideoView: ElementRef;

  connection: VideoCallConnection;

  constructor(public webrtcConfigService: WebrtcConfigService, public videoService: VideoService) {
    this.connection = webrtcConfigService.asMediaConnection();
  }

  ngOnInit(): void {

    setTimeout(() => {
      console.log(this.myVideoView);
      this.connection.getLocalStream().subscribe(stream => {
        this.myVideoView.nativeElement.srcObject = stream;
      });
      this.connection.getRemoteStream().subscribe(stream => {
        this.remoteVideoView.nativeElement.srcObject = stream;
      });
    }, 1000);

  }

  async call() {

    // const stream = await this.videoService.getLocalVideoStream();
    // this.myVideoView.nativeElement.srcObject = stream;
    // const connection = this.webrtcConfigService.asMediaConnection();
    // connection.addStream(stream);
    // connection.onaddstream((remoteStream) => {
    //   console.log('onaddstream');
    //   this.remoteVideoView.nativeElement.srcObject = remoteStream;
    // });


  }

  hangup() {

    this.myVideoView.nativeElement.srcObject = null;
    this.remoteVideoView.nativeElement.srcObject = null;
    this.connection.close();
  }
}
