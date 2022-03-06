import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {TextTransferComponent} from './text-transfer/text-transfer.component';
import {ConnectedGuard} from '../shared/connected.guard';

const routes: Routes = [

  {path: 'transfer',

    canActivateChild: [ConnectedGuard],
    children: [
    {path: 'text', component: TextTransferComponent},
    {path: '', redirectTo:'text', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TransferRoutingModule { }
