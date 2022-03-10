import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WebrtcConfigService} from '../../connection/config/webrtc-config.service';
import {WebrtcConnectionService} from '../../connection/services/webrtc-connection.service';
import {FormBuilder} from '@angular/forms';
import {ConnectionType} from '../../connection/models/Connection';

@Component({
  selector: 'app-transfer-container',
  templateUrl: './transfer-container.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./transfer-container.component.scss']
})
export class TransferContainerComponent implements OnInit {

  isMedia:boolean = false;
  isData:boolean = false;
  connectionStatus: string = 'unknown';


  constructor(private router: Router, private ref: ChangeDetectorRef, private webrtcConfigService: WebrtcConfigService, private webrtcService: WebrtcConnectionService, public formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

    let connection = this.webrtcConfigService.connection;

    connection.connectionStatusChanged().subscribe(status => {

      this.connectionStatus = status;
      this.isMedia = connection.getConnectionType() === ConnectionType.VIDEOCALL;
      this.isData = connection.getConnectionType() === ConnectionType.TEXT;

      // if (status === 'connected') {
      //   this.canShow = true;
      //
      // }
      // this.ref.markForCheck();
      this.ref.detectChanges();
    });
  }

  // ngAfterViewChecked(): void {
  //   console.log('checking ngAfterViewChecked')
  // }

}
