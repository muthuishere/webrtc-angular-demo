import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavigationComponent } from './navigation/navigation.component';

import { ConnectComponent } from './connect/connect.component';

import { TextTransferComponent } from './text-transfer/text-transfer.component';
import {TransferModule} from './transfer/transfer.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ConnectComponent

  ],
  imports: [
    BrowserModule,
    TransferModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
