import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ACCOUNT_TYPE} from "../../../core/models/IUser";
import {AuthService} from "../../../core/services/auth.service";
import {IDialog} from "../../../core/models/IDialog";
import {MatDialog} from "@angular/material/dialog";
import {SignInErrorDialogComponent} from "../../../shared/components/sign-in-error-dialog/sign-in-error-dialog.component";
import {Router} from "@angular/router";

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
    private readonly router: Router
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

  openModalError(data: IDialog) {
    this.dialog.open(SignInErrorDialogComponent, {data});
  }
}
