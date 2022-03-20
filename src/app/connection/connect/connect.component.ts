import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {WebrtcConnectorService} from '../config/webrtc-connector.service';
import {Connection, ConnectionType} from '../models/Connection';
import {SignallingServerService} from '../../signalling/signalling-server.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {



  constructor(private signallingServerService: SignallingServerService, private ref: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private webrtcConfigService: WebrtcConnectorService, public formBuilder: FormBuilder) {
  }
  connectionForm;
  connection: Connection;

  canShowTransfer = false;
  canShowAcceptAnswer = false;
  showConnectAgain = false;
  connectionType:string;

  ngOnInit(): void {

    this.createFormInstance();
    this.route.paramMap.subscribe( async paramMap => {
      // this.connection = null;
      await this.resetComponent();
      console.log(paramMap);
      const currentType = paramMap.get('type');
      this.connect(currentType);
    });

  }

  private async resetComponent() {
    await this.webrtcConfigService.closeConnection();
    this.connectionForm.reset();
    this.canShowTransfer = false;
    this.canShowAcceptAnswer = false;
    this.showConnectAgain = false;
    this.ref.detectChanges();
  }

  connectAgain() {

    this.connectionForm.reset();
    this.connection = this.webrtcConfigService.createConnection(this.connectionType);
    this.waitForConnectionStatusDisconnected();
    this.canShowAcceptAnswer = false;
    this.showConnectAgain = false;
    this.ref.detectChanges();
  }

  private createFormInstance() {
    this.connectionForm = this.formBuilder.group(this.getFormControlsforConnecting());
  }

  private connect(connectionType: string) {
    this.canShowTransfer = false;
    this.canShowAcceptAnswer = false;
    this.connectionType=connectionType;
    console.log("connecting params", connectionType);
    this.connectionForm.reset();
    this.connection = this.webrtcConfigService.createConnection(connectionType);
    this.waitForConnectionStatusDisconnected();
    this.canShowTransfer = true;
    this.ref.detectChanges();
    // TODO Remove

    this.signallingServerService.createOffer(this);

  }

  private waitForConnectionStatusDisconnected() {
    this.webrtcConfigService.getConnectionStatus().subscribe(status => {

      if (status === 'disconnected') {
        this.showConnectAgain = true;
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


  async onCreateOffer() {

console.log('create offer');
const offer = await this.connection.createOffer();

console.log(offer);
this.connectionForm.controls.offer.setValue(offer);
this.canShowAcceptAnswer = true;
this.ref.detectChanges();

    }


  async acceptAnswer() {

    await this.connection.acceptAnswer(this.connectionForm.controls.answer.value);

    console.log(this.connection)

  }


}
