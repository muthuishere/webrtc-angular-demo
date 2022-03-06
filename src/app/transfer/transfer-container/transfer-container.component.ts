import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WebrtcConfigService} from '../../shared/webrtc-config.service';
import {WebrtcService} from '../../shared/webrtc.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-transfer-container',
  templateUrl: './transfer-container.component.html',
  styleUrls: ['./transfer-container.component.scss']
})
export class TransferContainerComponent implements OnInit {

  canShow:boolean = false;
  connectionStatus:string='unknown';

  constructor(private router: Router,private webrtcConfigService:WebrtcConfigService, private webrtcService: WebrtcService, public formBuilder: FormBuilder) {

    webrtcConfigService.connection.connectionStatusChanged().subscribe(status => {
      console.log('connection status changed', status);
      this.connectionStatus = status;
      if (status === 'connected') {
        console.log('enabling show')
        this.canShow = true;
      }
    });
  }

  ngOnInit(): void {

  }

}
