import {Component} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log("tenemos sesion")
      } else {
        console.log("no tenemos sesion")
      }
    })
  }
}
