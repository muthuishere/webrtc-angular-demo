import { Component, OnInit } from '@angular/core';
import {WebrtcConfigService} from '../../shared/webrtc-config.service';
import {Router} from '@angular/router';
import {WebrtcService} from '../../shared/webrtc.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Connection} from '../../shared/Connection';

@Component({
  selector: 'app-text-transfer',
  templateUrl: './text-transfer.component.html',
  styleUrls: ['./text-transfer.component.scss']
})
export class TextTransferComponent implements OnInit {



  constructor(private router: Router,private webrtcConfigService:WebrtcConfigService, private webrtcService: WebrtcService, public formBuilder: FormBuilder) {
  }
  connectionForm;


  ngOnInit(): void {
    this.connectionForm = this.formBuilder.group(this.getFormControlsforConnecting());

    this.webrtcConfigService.connection.getMessageHandler().subscribe(message => {
      const prev=this.connectionForm.controls.roomlogs.value;
      this.connectionForm.controls.roomlogs.setValue(prev+'\n Other Person:'+message);

    });

  }

  private getFormControlsforConnecting() {
    return {
      message: ['', Validators.compose([Validators.required])],
      roomlogs: ['', Validators.compose([Validators.required])],
    };
  }
  sendMessage() {
    this.webrtcConfigService.connection.sendMessage( this.connectionForm.controls.message.value   );
  }
}
