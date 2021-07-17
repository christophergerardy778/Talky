import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {ACCOUNT_TYPE} from "../../../core/models/IUser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SignInErrorDialogComponent} from "../../../shared/components/sign-in-error-dialog/sign-in-error-dialog.component";
import {Router} from "@angular/router";
import firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  readonly email = ACCOUNT_TYPE.EMAIL;
  readonly google = ACCOUNT_TYPE.GOOGLE;
  readonly twitter = ACCOUNT_TYPE.TWITTER;
  readonly facebook = ACCOUNT_TYPE.FACEBOOK;

  isLoading = false;
  registerForm!: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly angularFireAuth: AngularFireAuth
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.minLength(6)
      ]],

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

  async registerUserByEmail($event: Event) {
    $event.preventDefault();
    this.isLoading = true;

    if (this.registerForm.valid) {
      try {
        const querySnapshot = await this.authService.userAlreadyExists(this.registerForm.get("email")!.value);

        if (querySnapshot.empty) {
          await this.authService.registerEmailUser({
            name: this.registerForm.get("name")!.value,
            email: this.registerForm.get("email")!.value,
            registerBy: ACCOUNT_TYPE.EMAIL,
            password: this.registerForm.get("password")!.value
          });

          await this.router.navigate(['/app']);

        } else {
          this.openDialogError(
            'Email already in use',
            'This email is already register please try with another email'
          );
        }
      } catch (e) {
        this.openDialogError("Unexpected error", e.toString());
      } finally {
        this.isLoading = false;
      }
    }
  }

  openDialogError(title: string, description: string) {
    this.dialog.open(SignInErrorDialogComponent, {
      data: {title, description}
    });
  }

  registerUserBySocial(accountType: ACCOUNT_TYPE) {
    this.authService.getSocialProvider(accountType)
      .then((user: firebase.auth.UserCredential) => {
        this.saveUserSocial(user, accountType).catch(() => this.openDialogError(
          'Email already in use',
          'This email is already register please try with another email'
        ));
      })
      .catch(() => {
        this.openDialogError('Process incomplete', 'Process canceled by user');
      });
  }

  async saveUserSocial(user: firebase.auth.UserCredential, accountType: ACCOUNT_TYPE) {
    const socialUser = this.authService.buildUserBySocialProvider(user, accountType);
    const querySnapshot = await this.authService.userAlreadyExists(socialUser.email);

    if (querySnapshot.empty) {
      await this.authService.createUserFirestore(socialUser);
      await this.router.navigate(['/app']);
    } else {
      this.openDialogError(
        'Email already in use',
        'This email is already register please try with another email'
      );

      const authUser = await this.angularFireAuth.currentUser;
      await authUser!.delete();
    }
  }
}
