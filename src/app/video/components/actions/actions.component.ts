import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {IUser} from "../../../core/models/IUser";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  user!: IUser;

  constructor(
    private readonly authService: AuthService,
    private readonly angularFireAuth: AngularFireAuth,
    private readonly router: Router
  ) {}

  roomName = "";

  ngOnInit(): void {
    this.angularFireAuth.user
      .subscribe( async user => {
        const query = await this.authService.getUserInfoById(user!.uid);
        this.user = query.docs[0].data();
      })
  }

  async goAndGenerateRoom() {
    const roomId = Math.floor(Math.random() * (100000 - 10000) + 10000);
    await this.router.navigate(["app/call", roomId]);
  }

  goToRoom() {
    return this.router.navigate(["app/call/", this.roomName]);
  }
}
