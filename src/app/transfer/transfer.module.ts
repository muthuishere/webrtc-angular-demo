import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextTransferComponent } from './text-transfer/text-transfer.component';
import {TransferRoutingModule} from './transfer-routing.module';



@NgModule({
  declarations: [
    TextTransferComponent
  ],
  imports: [
    CommonModule,
    TransferRoutingModule
  ]
})
export class TransferModule { }
