import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { StorageProvider } from '../../providers/storage/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

import { ServerResponseInterface, ServerResponseModel } from '../../app/models/ServerResponseModel';
//import { MediaModel } from '../../app/models/MediaModel';
//import { stringify } from '@angular/core/src/util';

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

  constructor(public http: Http, public utilities: UtilitiesProvider, public storage: StorageProvider, public authProvider: AuthProvider) {
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

  uploadVideo(data: string) {
    return new Promise((resolve, reject) => {

      // Session aus dem Native Storage auslesen:
      this.authProvider.checkAuthentication().then((sessionID: string) => {

        let headers = new Headers();
        headers.append('Content-Type', 'undefined');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('authorization', sessionID);
        headers.append('mode', 'video');

        var fd = new FormData();
        fd.append('upfile', data)

        // Übermittelt Videodaten an den Server. Gibt die Antwort des Servers zurück.
        this.http.post('/upload', fd, { headers: headers })
          .subscribe(data => {

            // JSON String parsen.
            let tempResponse: ServerResponseInterface = JSON.parse(JSON.stringify(data.json()));
            // ServerResponseModel-Object erstellen.
            let response: ServerResponseModel = new ServerResponseModel(tempResponse.success, tempResponse.msg);
            // SessionModel zurückgeben.
            resolve(response);

          }, (err) => {
            reject(err);
            console.error(JSON.stringify(err).toString())
          });

      }, (err) => {
        console.error(JSON.stringify(err).toString());
        reject(err);
      });
    });
  }

  listFilesInLog() {
    this.storage.getFileList("www/Video/").then((entries: string[]) => {
      entries.forEach(element => {
        console.error(element);
      });
    }, (err: string) => {
    });
  }

}
