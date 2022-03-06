import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {connect} from '../shared/config.actions';
import {WebrtcService} from '../shared/webrtc.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Connection} from '../shared/Connection';

@Component({
  selector: 'app-joinForText',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {


  constructor(private router: Router, private webrtcService: WebrtcService, public formBuilder: FormBuilder, private store: Store<{ config: any }>) {
  }

  connectionForm;

  ngOnInit(): void {
    this.connectionForm = this.formBuilder.group(this.getFormControlsforConnecting());
    let controls = this.connectionForm.controls;
    console.log(controls)
  }

  onClick(): any {
    this.router.navigate(['/transfer']);
    this.store.dispatch(connect());
  }

  private getFormControlsforConnecting() {
    return {
      offer: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
      roomlogs: ['', Validators.compose([Validators.required])],
      answer: ['', Validators.compose([Validators.required])]
    };
  }


  connection: Connection;

  async onAcceptOffer() {

    this.connection = await this.webrtcService.createConnection();
    this.connection.getMessageHandler().subscribe(message => {
      const prev=this.connectionForm.controls.roomlogs.value;
      this.connectionForm.controls.roomlogs.setValue(prev+'\n'+message);

    });
    let controls = this.connectionForm.controls;
    console.log(controls)
    await this.connection.joinForText(controls.offer.value);

    //TODO remove
    this.createAnswer();

  }

  async createAnswer() {
    const answer =  await this.connection.createAnswer();
    this.connectionForm.controls.answer.setValue(answer);
  }
  public onFormSubmit(){

  }
  sendMessage() {
    this.connection.sendMessage( this.connectionForm.controls.message.value   );
  }
}
