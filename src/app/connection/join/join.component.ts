import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {WebrtcConnectionService} from '../services/webrtc-connection.service';
import {FormBuilder, Validators} from '@angular/forms';
import {WebrtcConfigService} from '../config/webrtc-config.service';
import {Connection, ConnectionType} from '../models/Connection';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute,private webrtcConfigService: WebrtcConfigService, private webrtcService: WebrtcConnectionService, public formBuilder: FormBuilder) {
  }

  connectionForm;
  connection: Connection;
  canShowTransfer = false;

  ngOnInit(): void {

    this.route.paramMap.subscribe( paramMap => {
      this.connection=null;
      const currentType  = paramMap.get('type');
      this.joinConnection(currentType);

    })

  }


  private joinConnection(connectionType:string) {

    this.connectionForm = this.formBuilder.group(this.getFormControlsforConnecting());
    this.connection = this.webrtcConfigService.createConnection(connectionType);

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



}
