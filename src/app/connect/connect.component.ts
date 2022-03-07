import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {WebrtcConnectionService} from '../shared/webrtc-connection.service';
import {Connection} from '../shared/Connection';
import {WebrtcConfigService} from '../shared/webrtc-config.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {



  constructor(private router: Router,private webrtcService: WebrtcConnectionService, private webrtcConfigService: WebrtcConfigService, public formBuilder: FormBuilder) {
  }
  connectionForm;
  connection: Connection;
  connectionState$;
  canShowTransfer=false

  ngOnInit(): void {
    this.connectionForm = this.formBuilder.group(this.getFormControlsforConnecting());
    this.connection = this.webrtcService.createConnection();
    this.webrtcConfigService.connection = this.connection;
    this.canShowTransfer = true;
    this.onCreateOffer();
  }



  private getFormControlsforConnecting() {
    return {
      offer: ['', Validators.compose([Validators.required])],
      answer: ['', Validators.compose([Validators.required])]
    };
  }
  async onCreateOffer() {


    this.connectionState$  = this.connection.connectionStatusChanged();
    const offer = await this.connection.createOffer();

    this.connectionForm.controls.offer.setValue(offer);

  }


  onFormSubmit(){}

  async acceptAnswer() {

    await this.connection.acceptAnswer(this.connectionForm.controls.answer.value);


  }


}
