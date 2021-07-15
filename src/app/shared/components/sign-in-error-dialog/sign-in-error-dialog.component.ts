import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IDialog} from "../../../core/models/IDialog";

@Component({
  selector: 'app-sign-in-error-dialog',
  templateUrl: './sign-in-error-dialog.component.html',
  styleUrls: ['./sign-in-error-dialog.component.scss']
})
export class SignInErrorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialog) { }

  ngOnInit(): void {}
}
