import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ConnectComponent} from './connect/connect.component';
import {JoinComponent} from './join/join.component';



const routes: Routes = [
  {path: '', redirectTo: 'connect', pathMatch: 'full',},
  {path: 'connect',component: ConnectComponent,},
  {path: 'join',component: JoinComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
