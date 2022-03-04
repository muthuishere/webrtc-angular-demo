import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ConnectComponent} from './connect/connect.component';

import {TextTransferComponent} from './text-transfer/text-transfer.component';

const routes: Routes = [
  {path: '', redirectTo: 'connect', pathMatch: 'full',},
  {path: 'connect',component: ConnectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
