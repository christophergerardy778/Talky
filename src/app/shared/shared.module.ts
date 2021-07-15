import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthToolbarComponent} from './components/auth-toolbar/auth-toolbar.component';
import {MaterialModule} from "../material/material.module";
import {RouterModule} from "@angular/router";
import { SignInErrorDialogComponent } from './components/sign-in-error-dialog/sign-in-error-dialog.component';

@NgModule({
  declarations: [
    AuthToolbarComponent,
    SignInErrorDialogComponent
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
