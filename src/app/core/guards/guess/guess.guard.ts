import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class GuessGuard implements CanActivate {

  constructor(private readonly router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.router.navigate(["/app"]);
          resolve(false);
        } else {
          resolve(true);
        }
      })
    });
  }

}
