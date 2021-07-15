import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ACCOUNT_TYPE} from "../../../core/models/IUser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  readonly email = ACCOUNT_TYPE.EMAIL;
  readonly google = ACCOUNT_TYPE.GOOGLE;
  readonly twitter = ACCOUNT_TYPE.TWITTER;
  readonly facebook = ACCOUNT_TYPE.FACEBOOK;

  constructor(private readonly formBuilder: FormBuilder) {}

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
}
