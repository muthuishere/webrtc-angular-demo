import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {TextTransferComponent} from './text-transfer/text-transfer.component';

const routes: Routes = [

  {path: 'transfer',children: [
    {path: 'text', component: TextTransferComponent},
    {path: '', redirectTo:'text', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TransferRoutingModule { }
