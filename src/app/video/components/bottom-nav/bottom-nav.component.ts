import { EventEmitter } from '@angular/core';
import {Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {

  @Output()
  eventEmitterVideo = new EventEmitter();

  @Output()
  eventEmitterAudio = new EventEmitter();

  isVideoActive = true;
  isAudioActive = true;

  constructor() { }

  ngOnInit(): void {}

  changeAndEmitVideoState() {
    this.isVideoActive = !this.isVideoActive;
    this.eventEmitterVideo.emit();
  }

  changeAndEmitAudioState() {
    this.isAudioActive = !this.isAudioActive;
    this.eventEmitterAudio.emit();
  }


}
