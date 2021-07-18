import {Component, Input, OnInit} from '@angular/core';
import {IVideoItem} from "../../../core/models/IVideoItem";

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit {

  @Input()
  metadata!: IVideoItem

  constructor() { }

  ngOnInit(): void {

  }
}
