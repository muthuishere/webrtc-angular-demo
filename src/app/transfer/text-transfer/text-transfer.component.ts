import {Component, OnInit} from '@angular/core';
import {WebrtcConnectorService} from '../../connection/config/webrtc-connector.service';
import {Router} from '@angular/router';
import {WebrtcCreatorService} from '../../connection/services/webrtc-creator.service';
import {FormBuilder, Validators} from '@angular/forms';
import {DataConnection} from '../../connection/models/DataConnection';

@Component({
  selector: 'app-text-transfer',
  templateUrl: './text-transfer.component.html',
  styleUrls: ['./text-transfer.component.scss']
})
export class TextTransferComponent implements OnInit {


  dataConnection: DataConnection;

  constructor(private router: Router, private webrtcConfigService: WebrtcConnectorService, public formBuilder: FormBuilder) {
  }

  transferForm;


  ngOnInit(): void {
    this.dataConnection = this.webrtcConfigService.asDataConnection();
    this.transferForm = this.formBuilder.group(this.getFormControlsforConnecting());

    this.dataConnection.getMessageHandler().subscribe(message => {
      if (message.trim().length > 0) {
        const prev = this.transferForm.controls.roomlogs.value;
        this.transferForm.controls.roomlogs.setValue(prev + '\n Someother :' + message);
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
    let message = this.transferForm.controls.message.value;
    const prev = this.transferForm.controls.roomlogs.value;


    this.dataConnection.sendMessage(message);
    this.transferForm.controls.roomlogs.setValue(prev + '\n Me:' + message);
  }
}
