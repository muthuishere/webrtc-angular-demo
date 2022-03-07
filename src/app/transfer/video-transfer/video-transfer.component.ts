import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VideoService} from './services/video.service';
import {WebrtcConfigService} from '../../shared/webrtc-config.service';

@Component({
  selector: 'app-video-transfer',
  templateUrl: './video-transfer.component.html',
  styleUrls: ['./video-transfer.component.scss']
})
export class VideoTransferComponent implements OnInit {

  @ViewChild("myvideo") myVideoView: ElementRef;
  @ViewChild("remoteVideo") remoteVideoView: ElementRef;

  constructor(public webrtcConfigService:WebrtcConfigService,public videoService:VideoService) { }

  ngOnInit(): void {

  }

  async call() {

    const stream = await this.videoService.getLocalVideoStream();
    this.myVideoView.nativeElement.srcObject = stream;
    this.webrtcConfigService.connection.addStream(stream);
    this.webrtcConfigService.connection.onaddstream( (remoteStream)=>{
      console.log("onaddstream");
      this.remoteVideoView.nativeElement.srcObject = remoteStream;
    });


  }

  hangup() {
    console.log('hangup');
  }
}
