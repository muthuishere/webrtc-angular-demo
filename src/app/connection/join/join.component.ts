import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {WebrtcCreatorService} from '../services/webrtc-creator.service';
import {FormBuilder, Validators} from '@angular/forms';
import {WebrtcConnectorService} from '../config/webrtc-connector.service';
import {Connection} from '../models/Connection';
import {SignallingServerService} from '../../signalling/signalling-server.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {


  constructor(private signallingServerService: SignallingServerService, private ref: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private webrtcConfigService: WebrtcConnectorService, private webrtcService: WebrtcCreatorService, public formBuilder: FormBuilder) {
  }

  connectionForm;
  connection: Connection;
  canShowTransfer = false;
  canShowCreateAnswer = false;
  showJoinAgain = false;
  connectionType: string;

  ngOnInit(): void {
    this.createFormInstance();
    this.route.paramMap.subscribe(async paramMap => {


      await this.resetComponent();

      const currentType = paramMap.get('type');
      this.joinConnection(currentType);

    });

  }
  private async resetComponent() {
    await this.webrtcConfigService.closeConnection();
    this.connectionForm.reset();
    this.canShowTransfer = false;
    this.canShowCreateAnswer = false;
    this.showJoinAgain = false;
    this.ref.detectChanges();
  }
  joinAgain() {
    this.connectionForm.reset();
    this.connection = this.webrtcConfigService.createConnection(this.connectionType);
    this.waitForStatusChange();
    this.canShowCreateAnswer = false;
    this.showJoinAgain = false;
    this.ref.detectChanges();
  }

  private createFormInstance() {
    this.connectionForm = this.formBuilder.group(this.getFormControlsforConnecting());
  }

  private joinConnection(connectionType: string) {
    console.log('joinConnection connecting params', connectionType);
    this.canShowTransfer = false;
    this.connectionType = connectionType;
    this.connectionForm.reset();
    this.connection = this.webrtcConfigService.createConnection(connectionType);
    this.waitForStatusChange();

    this.canShowTransfer = true;
    //TODO remove
    this.signallingServerService.joinApp(this);

  }

  private waitForStatusChange() {
    this.connection.connectionStatusChanged().subscribe(status => {

      console.log('joinConnection connectionStatusChanged', status);
      if (status === 'disconnected') {
        this.showJoinAgain = true;
        this.ref.detectChanges();
      }

    });
  }

  private getFormControlsforConnecting() {
    return {
      offer: ['', Validators.compose([Validators.required])],
      answer: ['', Validators.compose([Validators.required])]
    };
  }


  async onAcceptOffer() {


    await this.connection.join(this.connectionForm.controls.offer.value);

    this.canShowCreateAnswer = true;
    this.ref.detectChanges();
    // //TODO remove
    // this.createAnswer();

  }

  async createAnswer() {
    const answer = await this.connection.createAnswer();
    this.connectionForm.controls.answer.setValue(answer);
  }


}
