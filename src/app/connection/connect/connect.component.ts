import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {WebrtcConfigService} from '../config/webrtc-config.service';
import {Connection, ConnectionType} from '../models/Connection';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {



  constructor(private router: Router, private route: ActivatedRoute, private webrtcConfigService: WebrtcConfigService, public formBuilder: FormBuilder) {
  }
  connectionForm;
  connection: Connection;
  connectionState$;
  canShowTransfer=false

  ngOnInit(): void {
    this.connectionForm = this.formBuilder.group(this.getFormControlsforConnecting());
    this.route.paramMap.subscribe( paramMap => {
      this.connection=null;

      console.log(paramMap);
      const currentType  = paramMap.get('type');
      this.connect(currentType);
    });

  }


  private connect(connectionType: string) {
    this.connectionForm = this.formBuilder.group(this.getFormControlsforConnecting());
    this.connection = this.webrtcConfigService.createConnection(connectionType);

    this.canShowTransfer = true;
    //TODO Remove
    this.onCreateOffer();
  }

  private getFormControlsforConnecting() {
    return {
      offer: ['', Validators.compose([Validators.required])],
      answer: ['', Validators.compose([Validators.required])]
    };
  }


  async onCreateOffer() {

console.log("create offer");
    this.connectionState$  = this.connection.connectionStatusChanged();
    const offer = await this.connection.createOffer();

    console.log(offer);
    this.connectionForm.controls.offer.setValue(offer);

  }


  async acceptAnswer() {

    await this.connection.acceptAnswer(this.connectionForm.controls.answer.value);


  }


}
