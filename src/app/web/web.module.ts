import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebLayoutComponent} from './components/web-layout/web-layout.component';
import {WebRoutingModule} from "./web-routing.module";
import {SharedModule} from "../shared/shared.module";
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {MaterialModule} from "../material/material.module";
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    WebLayoutComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class WebModule {
}
