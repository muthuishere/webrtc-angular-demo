import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextTransferComponent } from './text-transfer/text-transfer.component';
import {TransferRoutingModule} from './transfer-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { TransferContainerComponent } from './transfer-container/transfer-container.component';
import { VideoTransferComponent } from './video-transfer/video-transfer.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { StickyNoteComponent } from './whiteboard/sticky-note/sticky-note.component';
import { OtherUserPositionComponent } from './whiteboard/other-user-position/other-user-position.component';



@NgModule({
  declarations: [
    TextTransferComponent,
    TransferContainerComponent,
    VideoTransferComponent,
    WhiteboardComponent,
    StickyNoteComponent,
    OtherUserPositionComponent
  ],
  exports: [
    TransferContainerComponent
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    DragDropModule,
    ReactiveFormsModule
  ]
})
export class TransferModule { }
