import {Injectable} from '@angular/core';
import {MockSignallingServerService} from './local/mock-signalling-server.service';
import {JoinComponent} from '../connection/join/join.component';
import {ConnectComponent} from '../connection/connect/connect.component';

@Injectable({
  providedIn: 'root'
})
export class SignallingServerService {

  disabled=false;
  //disabled=true;
  constructor(private mockSignallingServerService: MockSignallingServerService) {
  }


  async joinApp(joinComponent:JoinComponent) {

if(this.disabled)
  return

    setTimeout(async () => {
      const  controls= joinComponent.connectionForm.controls;
      const offer = await this.mockSignallingServerService.waitAndgetOffer();
      controls.offer.setValue(offer);
      await joinComponent.onAcceptOffer();
      await joinComponent.createAnswer();
      const answer = controls.answer.value;
      await this.mockSignallingServerService.putAnswer(answer);
      console.log('answer sent successfully');

    },10);


  }

  createOffer(connectComponent: ConnectComponent) {

    if(this.disabled)
      return

    setTimeout(async () => {
      await  connectComponent.onCreateOffer();
      const controls = connectComponent.connectionForm.controls;
      const offer = controls.offer.value;
      console.log('sending',offer);
      await this.mockSignallingServerService.putOffer(offer);
      console.log('offer sent');
      const answer = await this.mockSignallingServerService.waitAndgetAnswer();
      controls.answer.setValue(answer);
      await connectComponent.acceptAnswer();
    }, 10);
  }
}
