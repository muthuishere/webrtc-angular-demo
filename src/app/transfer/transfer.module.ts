import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextTransferComponent } from './text-transfer/text-transfer.component';
import {TransferRoutingModule} from './transfer-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { TransferContainerComponent } from './transfer-container/transfer-container.component';
import { VideoTransferComponent } from './video-transfer/video-transfer.component';



@NgModule({
  declarations: [
    TextTransferComponent,
    TransferContainerComponent,
    VideoTransferComponent
  ],
  exports: [
    TransferContainerComponent
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    ReactiveFormsModule
  ]
})
export class TransferModule { }
