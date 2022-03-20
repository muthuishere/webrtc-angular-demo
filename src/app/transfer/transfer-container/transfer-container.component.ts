import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WebrtcConnectorService} from '../../connection/config/webrtc-connector.service';
import {WebrtcCreatorService} from '../../connection/services/webrtc-creator.service';
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


  constructor(private router: Router, private ref: ChangeDetectorRef, private webrtcConfigService: WebrtcConnectorService, private webrtcService: WebrtcCreatorService, public formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

    console.log('transfer container init');

    this.webrtcConfigService.getConnectionStatus().subscribe(status => {

      console.log('transfer container status', status);
      //if disconnected then make it empty
      console.log('TransferContainerComponent connection status changed', status);
      this.connectionStatus = status;
      const connection = this.webrtcConfigService.connection;

      if (status === 'connected') {
        this.isMedia = connection.getConnectionType() === ConnectionType.VIDEOCALL;
        this.isData = connection.getConnectionType() === ConnectionType.TEXT;


      }else{
        this.isMedia = false;
        this.isData = false;
      }
      // this.ref.markForCheck();
      this.ref.detectChanges();
    });
  }



}
