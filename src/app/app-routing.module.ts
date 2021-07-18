import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationGuard} from "./core/guards/authentication/authentication.guard";
import {GuessGuard} from "./core/guards/guess/guess.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [GuessGuard],
    loadChildren: () => import("./web/web.module").then(m => m.WebModule)
  },
  {
    path: 'app',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import("./video/video.module").then(m => m.VideoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
