import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {connect} from '../shared/config.actions';
import {WebrtcService} from '../shared/webrtc.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Connection} from '../shared/Connection';
import {WebrtcConfigService} from '../shared/webrtc-config.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {


  constructor(private router: Router, private webrtcConfigService: WebrtcConfigService, private webrtcService: WebrtcService, public formBuilder: FormBuilder, private store: Store<{ config: any }>) {
  }

  connectionForm;
  connection: Connection;
  canShowTransfer = false;

  ngOnInit(): void {
    this.connectionForm = this.formBuilder.group(this.getFormControlsforConnecting());

  }

  onClick(): any {
    this.router.navigate(['/transfer']);
    this.store.dispatch(connect());
  }

  private getFormControlsforConnecting() {
    return {
      offer: ['', Validators.compose([Validators.required])],
      answer: ['', Validators.compose([Validators.required])]
    };
  }

  async onAcceptOffer() {

    this.connection = await this.webrtcService.createConnection();
    this.webrtcConfigService.connection = this.connection;
    this.canShowTransfer = true;


    let controls = this.connectionForm.controls;
    console.log(controls);
    await this.connection.join(controls.offer.value);

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
