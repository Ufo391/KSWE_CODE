import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { VideoPlayer } from '@ionic-native/video-player';
import { FileTransfer, FileTransferObject, FileUploadResult } from '@ionic-native/file-transfer';
import 'rxjs/add/operator/map';

import { StorageProvider } from '../../providers/storage/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

import { ServerResponseModel, ServerResponseInterface } from '../../app/models/ServerResponseModel';
import { SessionModel } from '../../app/models/SessionModel';

/*
  Plugin "Streaming Media"?
  Plugin "Media Capture -> CaptureVideo"?

  Plugin "Camera Preview"
  https://ionicframework.com/docs/native/camera-preview/

  "Video Capture Plus"
  https://ionicframework.com/docs/native/video-capture-plus/
*/

// URL for noProxy
const PROXY = "http://minden.froese-energieausholz.de:3000/api";
//const PROXY = "";
// File System Path
const PATH = "file:///android_asset/";

@Injectable()
export class MediaProvider {

  constructor(private videoPlayer: VideoPlayer,
    public http: Http,
    private transfer: FileTransfer,
    public storage: StorageProvider,
    public authProvider: AuthProvider,
    public utilities: UtilitiesProvider) {
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

  /*uploadVideo(data: string) {
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
  }*/

  uploadVideo(filename: string) {
    return new Promise((resolve, reject) => {

      this.authProvider.getToken().then((token: SessionModel) => {

        var progress: number = 0;
        this.utilities.showLoader("Uploading Video.... <br> Upload bei: " + progress + "%");

        const fileTransfer: FileTransferObject = this.transfer.create();
        var options = {
          fileKey: "upfile",
          fileName: filename,
          chunkedMode: false,
          mimeType: "multipart/form-data",
          headers: { authorization: token.getSessionID() }
        };
        fileTransfer.onProgress((e) => {
          if (progress < Math.round((e.loaded * 100) / e.total)) {
            progress = Math.round((e.loaded * 100) / e.total);
            this.utilities.setLoaderContent("Uploading Video.... <br> Upload bei: " + progress + "%");
          }
        });
        fileTransfer.upload(PATH + "www/Video/" + filename, PROXY + "/upload", options).then((result: FileUploadResult) => {
          this.utilities.closeLoader();

          // JSON String parsen.
          let tempResponse: ServerResponseInterface = JSON.parse(result.response);
          // ServerResponseModel-Object erstellen.
          let response: ServerResponseModel = new ServerResponseModel(tempResponse.success, tempResponse.msg);

          // Server Response auswerten
          if (response.getMsg() === "Done! Uploading files") {
            console.log("StarDuell Successfully uploaded Video.");
            this.utilities.giveAlert("Upload erfolgreich!", "Das Video konnte erfolgreich auf den Server hochgeladen werden.");
            resolve("StarDuell Successfully uploaded Video.");
          } else {
            if (response.getMsg() === "No File selected!") {
              console.error("StarDuell: No File selected for upload!");
              this.utilities.giveAlert("Fehler!", "Keine Datei zum uploaden ausgewählt!");
            } else {
              console.error("StarDuell: Fehler beim Upload: " + response.getMsg());
              this.utilities.giveAlert("Fehler!", response.getMsg());
            }
          }
        }, (err) => {
          console.error("StarDuell: Fehler beim Upload: " + JSON.stringify(err).toString())
          this.utilities.closeLoader();
          reject(err);
        });

      }, (err: string) => {
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
