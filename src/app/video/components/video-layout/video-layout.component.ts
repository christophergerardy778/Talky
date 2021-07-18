import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-video-layout',
  templateUrl: './video-layout.component.html',
  styleUrls: ['./video-layout.component.scss']
})
export class VideoLayoutComponent implements OnInit {

  isOpened = false;

  constructor(private router: Router) {
    this.isOpened = this.router.url !== "/app";
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isOpened = this.router.url !== "/app";
    })
  }

}
