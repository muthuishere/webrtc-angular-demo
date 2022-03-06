import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {connect} from '../shared/config.actions';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {WebrtcService} from '../shared/webrtc.service';
import {Connection} from '../shared/Connection';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  // constructor(private router: Router, private webrtcService: WebrtcService, public formBuilder: FormBuilder, private store: Store<{ config: any }>) {
  // }

  constructor(private router: Router, private webrtcService: WebrtcService, public formBuilder: FormBuilder) {
  }
  connectionForm;
  connection: Connection;
  connectionState$;

  ngOnInit(): void {
    this.connectionForm = this.formBuilder.group(this.getFormControlsforConnecting());

    this.onCreateOffer();
  }

  // copy() {
  //  const copyText = document.querySelector("#input");
  //   copyText.select();
  //   document.execCommand("copy");
  // }

  copyData(txt){
    navigator.clipboard.writeText(txt).then(function(e) {
      /* clipboard successfully set */
      console.log("succes",e)
    }, function(e) {
      /* clipboard write failed */
      console.log("fail",e)

    })
  }

  onClick(): any {
    this.router.navigate(['/transfer']);
    // this.store.dispatch(connect());
  }

  private getFormControlsforConnecting() {
    return {
      offer: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
      roomlogs: ['', Validators.compose([Validators.required])],
      answer: ['', Validators.compose([Validators.required])]
    };
  }
  async onCreateOffer() {

    this.connection = await this.webrtcService.createConnection();
    this.connection.getMessageHandler().subscribe(message => {
      const prev=this.connectionForm.controls.roomlogs.value;
      this.connectionForm.controls.roomlogs.setValue(prev+'\n Other Person:'+message);

    });
    this.connectionState$  = this.connection.connectionStatusChanged().pipe(
      tap(status => {
        console.log("onCreateOffer" ,status);
      })
    );
    const offer = await this.connection.createOfferForText();

    this.connectionForm.controls.offer.setValue(offer);

    //todo remove
    this.copyData(offer);
  }


  onFormSubmit(){}

  async acceptAnswer() {

    await this.connection.acceptAnswer(this.connectionForm.controls.answer.value);


  }

  sendMessage() {
    const prev=this.connectionForm.controls.roomlogs.value;
    const message =this.connectionForm.controls.message.value
    this.connectionForm.controls.roomlogs.setValue(prev+'\n me:'+message);
    this.connection.sendMessage(message   );
  }
}
