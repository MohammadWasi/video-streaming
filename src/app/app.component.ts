import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from './data.service';
import { Result } from './result';
import * as shaka from 'shaka-player';

// declare var shaka: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dataArray: object[];
  transform: number;
  selectedVideo = '';
  manifestUri = 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd';
  constructor(private data: DataService) {
    this.dataArray = [];
  }

  ngOnInit() {
    this.data.getData().subscribe((result: Result) => {
      this.dataArray = result.sliderArray;
    });
    this.initApp();
  }



  initApp() {
    shaka.polyfill.installAll();

    if (shaka.Player.isBrowserSupported()) {
    } else {

      console.error('Browser not supported!');
    }
  }
  openPlayer(i, item) {
    this.selectedVideo = item;
  }
  initPlayer(item) {
    const video = document.getElementById('video');
    const player = new shaka.Player(video);
    player.addEventListener('error', this.onErrorEvent);

    player.load(item.url).then(() => {
    }).catch(error => { this.onError(error) });  // onError is executed if the asynchronous load fails.
  }

  onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
  }
  dismiss() {
    this.selectedVideo = '';
  }

}
