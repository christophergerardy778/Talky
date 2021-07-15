import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebLayoutComponent} from "./components/web-layout/web-layout.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";

const routes: Routes = [
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule {
}
