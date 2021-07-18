import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  getUserMedia() {
    return navigator.mediaDevices.getUserMedia({
      video: {
        width: 320,
        height: 180,
        aspectRatio: 16/9,
      },
      audio: true,
    })
  }
}
