import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {connect} from '../shared/config.actions';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {WebrtcService} from '../shared/webrtc.service';
import {Connection} from '../shared/Connection';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {WebrtcConfigService} from '../shared/webrtc-config.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  // constructor(private router: Router, private webrtcService: WebrtcService, public formBuilder: FormBuilder, private store: Store<{ config: any }>) {
  // }

  constructor(private router: Router, private webrtcService: WebrtcService, private webrtcConfigService: WebrtcConfigService, public formBuilder: FormBuilder, private store: Store<{ config: any }>) {
  }
  connectionForm;
  connection: Connection;
  connectionState$;
  canShowTransfer=false

  ngOnInit(): void {
    this.connectionForm = this.formBuilder.group(this.getFormControlsforConnecting());

    this.onCreateOffer();
  }


  onClick(): any {
    this.router.navigate(['/transfer']);
    // this.store.dispatch(connect());
  }

  private getFormControlsforConnecting() {
    return {
      offer: ['', Validators.compose([Validators.required])],
      answer: ['', Validators.compose([Validators.required])]
    };
  }
  async onCreateOffer() {

    this.connection = await this.webrtcService.createConnection();
    this.webrtcConfigService.connection = this.connection;
    this.canShowTransfer = true;
    this.connectionState$  = this.connection.connectionStatusChanged();
    const offer = await this.connection.createOffer();

    this.connectionForm.controls.offer.setValue(offer);

  }


  onFormSubmit(){}

  async acceptAnswer() {

    await this.connection.acceptAnswer(this.connectionForm.controls.answer.value);


  }


}
