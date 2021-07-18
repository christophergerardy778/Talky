import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VideoLayoutComponent} from './components/video-layout/video-layout.component';
import {VideoRoutingModule} from "./video-routing.module";
import {MaterialModule} from "../material/material.module";
import {SharedModule} from "../shared/shared.module";
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ActionsComponent } from './components/actions/actions.component';
import { VideoCallComponent } from './components/video-call/video-call.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { VideoItemComponent } from './components/video-item/video-item.component';

@NgModule({
  declarations: [
    VideoLayoutComponent,
    ToolbarComponent,
    ActionsComponent,
    VideoCallComponent,
    BottomNavComponent,
    VideoItemComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class VideoModule {
}
