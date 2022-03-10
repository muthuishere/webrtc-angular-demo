import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ConnectComponent} from './connection/connect/connect.component';
import {JoinComponent} from './connection/join/join.component';



const routes: Routes = [
  {path: '', redirectTo: 'connect', pathMatch: 'full',},
  {path: 'connect', redirectTo: 'connect/videocall', pathMatch: 'full',},
  {path: 'connect/:type',component: ConnectComponent,},
  {path: 'join/:type',component: JoinComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
