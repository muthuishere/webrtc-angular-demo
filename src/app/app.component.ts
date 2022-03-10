import {Component, OnDestroy} from '@angular/core';
import {WebrtcConfigService} from './connection/config/webrtc-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy  {
  title = 'webrtc-demo';
  constructor(private webrtcConfigService:WebrtcConfigService) {
  }
  ngOnDestroy() {
    console.log('foo destroy')
    this.webrtcConfigService.connection?.close();
  }
}
