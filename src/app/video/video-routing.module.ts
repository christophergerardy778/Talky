import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VideoLayoutComponent} from "./components/video-layout/video-layout.component";
import {ActionsComponent} from "./components/actions/actions.component";
import {VideoCallComponent} from "./components/video-call/video-call.component";

const routes: Routes = [
  {
    path: '',
    component: VideoLayoutComponent,
    children: [
      {
        path: '',
        component: ActionsComponent
      },
      {
        path: 'call/:id',
        component: VideoCallComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule {
}
