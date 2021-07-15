import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthToolbarComponent} from './components/auth-toolbar/auth-toolbar.component';
import {MaterialModule} from "../material/material.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AuthToolbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    AuthToolbarComponent
  ]
})
export class SharedModule {
}
