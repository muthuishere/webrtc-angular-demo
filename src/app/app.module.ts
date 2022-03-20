import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavigationComponent } from './navigation/navigation.component';

import { ConnectComponent } from './connection/connect/connect.component';

import {TransferModule} from './transfer/transfer.module';

import { JoinComponent } from './connection/join/join.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PlatformModule} from '@angular/cdk/platform';
import { DoubleWhiteboardComponent } from './whiteboard-test/double-whiteboard/double-whiteboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ConnectComponent,
    JoinComponent,
    DoubleWhiteboardComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PlatformModule,
    TransferModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
