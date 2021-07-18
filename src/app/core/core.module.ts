import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocketIoModule} from "ngx-socket-io";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SocketIoModule.forRoot({url: "https://talky-socket.herokuapp.com"})
  ],
  exports: [
    SocketIoModule
  ]
})
export class CoreModule {
}
