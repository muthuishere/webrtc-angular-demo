import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavigationComponent } from './navigation/navigation.component';

import { ConnectComponent } from './connect/connect.component';

import {TransferModule} from './transfer/transfer.module';

import { JoinComponent } from './join/join.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ConnectComponent,
    JoinComponent

  ],
  imports: [
    BrowserModule,

    TransferModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
