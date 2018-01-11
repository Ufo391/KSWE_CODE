import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Plugin "Streaming Media"?
  Plugin "File Transfer"?
  Plugin "Media Capture -> CaptureVideo"?

  Plugin "Camera Preview"
  https://ionicframework.com/docs/native/camera-preview/

  "Video Capture Plus"
  https://ionicframework.com/docs/native/video-capture-plus/

  Plugin "Video Player"
  ionic cordova plugin add https://github.com/moust/cordova-plugin-videoplayer.git
  npm install --save @ionic-native/video-player
*/
@Injectable()
export class MediaProvider {

  constructor(public http: Http) {
  }

  /*submitVideo(filename: string) {
    const VIDEO_FOLDER = "Video/";
    const AUDIO_FOLDER = "Audio/";

    this.storage.readFileAsBinary(VIDEO_FOLDER + filename).then((binaryString: string) => {
      console.error(binaryString);
    }, (err) => {
      console.log("------ABC");
    });
  }*/

  /*playVideo(file: string) {
    // Playing a video.
    this.videoPlayer.play('file:///android_asset/www/movie.mp4').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }*/

  /*
  saveVideo(){
    this.storage.getFileList( "www/Video/").then((abc) => {
      console.log("----QWERTZ");
    }, (err: string) => {
      console.log("----NOPE1" + err);
    });
  }*/

}
