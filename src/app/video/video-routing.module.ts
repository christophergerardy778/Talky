import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VideoLayoutComponent} from "./components/video-layout/video-layout.component";

const routes: Routes = [
  {
    path: '',
    component: VideoLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
