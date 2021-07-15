import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./web/web.module").then(m => m.WebModule)
  },
  {
    path: 'app',
    loadChildren: () => import("./video/video.module").then(m => m.VideoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
