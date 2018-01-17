import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { VideoPlayer } from '@ionic-native/video-player';
import 'rxjs/add/operator/map';

import { StorageProvider } from '../../providers/storage/storage';
import { AuthProvider } from '../../providers/auth/auth';

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
*/

// URL for noProxy
//const PROXY = "http://minden.froese-energieausholz.de:3000/api";
const PROXY = "";

@Injectable()
export class MediaProvider {

  constructor(private videoPlayer: VideoPlayer,
    public http: Http,
    public storage: StorageProvider,
    public authProvider: AuthProvider) {
  }

  /*playVideo(file: string) {
    // Playing a video.
    this.videoPlayer.play('file:///android_asset/www/movie.mp4').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }*/

  playVideo(file: string) {
    return new Promise((resolve, reject) => {

      var filepath: string = "file:///android_asset/www/Video/" + file;

      this.videoPlayer.play(filepath).then(() => {
        resolve("Video " + file + " wird abgespielt.");
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }

  uploadVideo(data: string) {
    return new Promise((resolve, reject) => {

      // Session aus dem Native Storage auslesen:
      this.authProvider.checkAuthentication().then((sessionID: string) => {

        console.error("SID: " + sessionID)
        let headers = new Headers();
        headers.append('Content-Type', 'form-data');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('authorization', sessionID);

        var fd = new FormData();
        fd.append('upfile', data);

        // Übermittelt Videodaten an den Server. Gibt die Antwort des Servers zurück.
        this.http.post(PROXY + '/upload', {upfile: data}, { headers: headers })
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
