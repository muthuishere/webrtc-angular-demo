import { Component, OnInit } from '@angular/core';
import {WebrtcConfigService} from '../../shared/webrtc-config.service';
import {Router} from '@angular/router';
import {WebrtcConnectionService} from '../../shared/webrtc-connection.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Connection} from '../../shared/Connection';

@Component({
  selector: 'app-text-transfer',
  templateUrl: './text-transfer.component.html',
  styleUrls: ['./text-transfer.component.scss']
})
export class TextTransferComponent implements OnInit {



  constructor(private router: Router, private webrtcConfigService:WebrtcConfigService, private webrtcService: WebrtcConnectionService, public formBuilder: FormBuilder) {
  }
  connectionForm;


  ngOnInit(): void {
    this.connectionForm = this.formBuilder.group(this.getFormControlsforConnecting());

    this.webrtcConfigService.connection.getMessageHandler().subscribe(message => {
      if(message.trim().length > 0){
        const prev=this.connectionForm.controls.roomlogs.value;
        this.connectionForm.controls.roomlogs.setValue(prev+'\n Someother :'+message);
      }


    });

  }

  private getFormControlsforConnecting() {
    return {
      message: ['', Validators.compose([Validators.required])],
      roomlogs: ['', Validators.compose([Validators.required])],
    };
  }
  sendMessage() {
    let message = this.connectionForm.controls.message.value;
    const prev=this.connectionForm.controls.roomlogs.value;

    this.webrtcConfigService.connection.sendMessage( message   );
    this.connectionForm.controls.roomlogs.setValue(prev+'\n Me:'+message);
  }
}
