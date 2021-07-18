import {Component, OnInit} from '@angular/core';
import {IVideoItem} from "../../../core/models/IVideoItem";

import {Socket} from "ngx-socket-io";
import {PeerService} from "../../../core/services/peer.service";
import {ActivatedRoute} from "@angular/router";
import Peer, {MediaConnection} from "peerjs";
import {IPeerResponse} from "../../../core/models/IPeerResponse";

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements OnInit {

  peer!: Peer;
  myMediaSteam!: MediaStream;
  videoStreams: IVideoItem[] = [];

  constructor(
    private readonly socket: Socket,
    private readonly route: ActivatedRoute,
    private readonly peerService: PeerService,
  ) {
  }

  ngOnInit(): void {
    this.peer = new Peer(undefined,  {
      host: 'localhost',
      port: 3001
    });

    if (navigator && navigator.mediaDevices) {
      this.peer.on('open', peerId => {
        this.peerService.getUserMedia()
          .then((mediaStream: MediaStream) => this.addMyVideoToCall(peerId, mediaStream))
          .catch(error => this.handleError());
      })
    }
  }

  addMyVideoToCall(clientId: string, mediaStream: MediaStream) {
    console.log("my peer", clientId)
    this.myMediaSteam = mediaStream;
    this.startVideoCall();
    this.addVideoStream(clientId, mediaStream);
  }

  handleError() {}

  startVideoCall() {

    this.socket.emit("join-room", {
      roomName: this.route.snapshot.paramMap.get("id"),
      peerId: this.peer.id
    });

    this.socket.on('user-leave', (peerId: string) => {
      console.log('user leave call')
      this.videoStreams = this.videoStreams.filter(item => item.peer_id !== peerId);
    })

    this.peer.on("call", mediaConnection => {
      mediaConnection.answer(this.myMediaSteam);

      mediaConnection.on('stream', stream => {
        this.addVideoStream(mediaConnection.peer, stream);
      });
    });

    this.socket.on("user-connected", (payload: IPeerResponse) => {
      const remoteCall = this.peer.call(payload.peerId, this.myMediaSteam);
      this.remoteStream(remoteCall);
    });
  }

  remoteStream(call: MediaConnection) {
    call.on("stream", stream => {
      console.log('getting stream from', call.peer)
      this.addVideoStream(call.peer, stream);
    })
  }

  addVideoStream(peer_id: string, mediaStream: MediaStream) {
    if (!this.videoStreams.some(item => item.peer_id === peer_id)) {
      this.videoStreams.push({
        peer_id,
        mediaStream
      })
    }
  }
}
