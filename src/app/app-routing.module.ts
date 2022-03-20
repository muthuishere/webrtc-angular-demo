import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ConnectComponent} from './connection/connect/connect.component';
import {JoinComponent} from './connection/join/join.component';
import {WhiteboardComponent} from './transfer/whiteboard/whiteboard.component';



const routes: Routes = [
  {path: '', redirectTo: 'whiteboard', pathMatch: 'full'},
  {path: 'connect', redirectTo: 'connect/videocall', pathMatch: 'full'},
  {path: 'connect/:type',component: ConnectComponent},
  {path: 'join/:type',component: JoinComponent},
  {path: 'whiteboard',component: WhiteboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
