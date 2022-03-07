import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {WebrtcConnectionService} from '../shared/webrtc-connection.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Connection} from '../shared/Connection';
import {WebrtcConfigService} from '../shared/webrtc-config.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {


  constructor(private router: Router, private webrtcConfigService: WebrtcConfigService, private webrtcService: WebrtcConnectionService, public formBuilder: FormBuilder) {
  }

  connectionForm;
  connection: Connection;
  canShowTransfer = false;

  ngOnInit(): void {
    this.connectionForm = this.formBuilder.group(this.getFormControlsforConnecting());
    this.connection =  this.webrtcService.createConnection();
    this.webrtcConfigService.connection = this.connection;
    this.canShowTransfer = true;
  }



  private getFormControlsforConnecting() {
    return {
      offer: ['', Validators.compose([Validators.required])],
      answer: ['', Validators.compose([Validators.required])]
    };
  }

  async onAcceptOffer() {


    await this.connection.join(this.connectionForm.controls.offer.value);

    //TODO remove
    this.createAnswer();

  }

  async createAnswer() {
    const answer = await this.connection.createAnswer();
    this.connectionForm.controls.answer.setValue(answer);
  }

  public onFormSubmit() {

  }

}
