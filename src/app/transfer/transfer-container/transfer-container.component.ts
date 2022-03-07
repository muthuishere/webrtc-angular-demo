import {AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WebrtcConfigService} from '../../shared/webrtc-config.service';
import {WebrtcConnectionService} from '../../shared/webrtc-connection.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-transfer-container',
  templateUrl: './transfer-container.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./transfer-container.component.scss']
})
export class TransferContainerComponent implements OnInit  {

  // canShow:boolean = false;
  connectionStatus:string='unknown';

  constructor(private router: Router, private ref: ChangeDetectorRef, private webrtcConfigService:WebrtcConfigService, private webrtcService: WebrtcConnectionService, public formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

    this.webrtcConfigService.connection.connectionStatusChanged().subscribe(status => {

      this.connectionStatus = status;
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
