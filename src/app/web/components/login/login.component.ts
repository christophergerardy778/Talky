import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ACCOUNT_TYPE} from "../../../core/models/IUser";
import {AuthService} from "../../../core/services/auth.service";
import {IDialog} from "../../../core/models/IDialog";
import {MatDialog} from "@angular/material/dialog";
import {SignInErrorDialogComponent} from "../../../shared/components/sign-in-error-dialog/sign-in-error-dialog.component";
import {Router} from "@angular/router";
import firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  loginForm!: FormGroup;

  readonly email = ACCOUNT_TYPE.EMAIL;
  readonly google = ACCOUNT_TYPE.GOOGLE;
  readonly twitter = ACCOUNT_TYPE.TWITTER;
  readonly facebook = ACCOUNT_TYPE.FACEBOOK;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly angularFireAuth: AngularFireAuth
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [
        Validators.required,
        Validators.minLength(6),
        Validators.email
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(6),
      ]],
    })
  }

  async emailLoginUser($event: Event) {
    this.isLoading = true;
    $event.preventDefault();

    if (this.loginForm.valid) {
      try {
        const querySnapshot = await this.authService.userAlreadyExists(this.loginForm.get("email")!.value)

        if (!querySnapshot.empty) {
          const email = this.loginForm.get("email")!.value;
          const password = this.loginForm.get("password")!.value;

          this.authService.loginUserByEmailAndPassword(email, password)
            .then(() => this.router.navigate(["/app"]))
            .catch(() => this.openModalError({
              title: 'Wrong credentials',
              description: 'Check your credentials'
            }))

        } else {
          this.openModalError({
            title: 'Email not found',
            description: 'This account no is register'
          })
        }
      } catch (e) {
        this.openModalError({
          title: 'Application error',
          description: e.toString()
        })
      } finally {
        this.isLoading = false;
      }
    }
  }

  loginUserSocial(accountType: ACCOUNT_TYPE) {
    this.authService.getSocialProvider(accountType)
      .then((user) => this.registerOrLoginUser(user, accountType))
      .catch((error) => this.handleAuthErrors(error.code));
  }

  async registerOrLoginUser(user: firebase.auth.UserCredential, accountType: ACCOUNT_TYPE) {
    if (user.additionalUserInfo!.isNewUser) {
      const userSocial = this.authService.buildUserBySocialProvider(user, accountType);
      await this.authService.createUserFirestore(userSocial);
      await this.router.navigate(["app"])
    } else {
      await this.router.navigate(["/app"])
    }
  }

  openModalError(data: IDialog) {
    this.dialog.open(SignInErrorDialogComponent, {data});
  }

  handleAuthErrors(code: string) {
    switch (code) {

      case "auth/account-exists-with-different-credential":
        return this.openModalError({
          title: 'Email already exists',
          description: 'This email is already in use please use another and try again'
        });

      case "auth/popup-closed-by-user":
        return this.openModalError({
          title: 'Process incomplete',
          description: 'Process aborted by user'
        });

      default:
        return this.openModalError({
          title: 'Application error',
          description: 'Unexpected error'
        });
    }
  }
}
