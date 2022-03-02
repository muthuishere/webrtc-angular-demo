import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppStartupComponent} from './app-startup/app-startup.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full',},
  {path: 'login',component:AppStartupComponent},
  {path: 'home',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
