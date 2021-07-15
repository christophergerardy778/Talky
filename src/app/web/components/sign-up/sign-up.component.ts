import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {ACCOUNT_TYPE} from "../../../core/models/IUser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SignInErrorDialogComponent} from "../../../shared/components/sign-in-error-dialog/sign-in-error-dialog.component";

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
    private readonly dialog: MatDialog
  ) {}

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

    if (this.registerForm.valid) {
      try {
        this.isLoading = true;

        await this.authService.registerEmailUser({
          name: this.registerForm.get("name")!.value,
          email: this.registerForm.get("email")!.value,
          registerBy: ACCOUNT_TYPE.EMAIL,
          password: this.registerForm.get("password")!.value
        });

      } catch (e) {
        this.dialog.open(SignInErrorDialogComponent, {
          data: {
            title: "Email already in use",
            description: `Email: ${this.registerForm.get('email')?.value } is already in use please use another email and try again`
          }
        })
      } finally {
        this.isLoading = false;
      }
    }
  }

  async registerUserBySocial(accountType: ACCOUNT_TYPE) {
    try {
      await this.authService.registerSocialUser(accountType);
    } catch (e) {
      this.dialog.open(SignInErrorDialogComponent, {
        data: {
          title: "Email already in use",
          description: `This email is already in use please use another email and try again`
        }
      })
    }
  }
}
