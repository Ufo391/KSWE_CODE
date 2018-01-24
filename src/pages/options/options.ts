import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomePage } from '../home/home';

import { StorageProvider } from '../../providers/storage/storage';
import { MediaProvider } from '../../providers/media/media';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})

export class OptionsPage {

  genres: Array<string> = [];
  subjects: Array<string> = [];
  genreID: string = "";
  subjectID: string = "";
  duration: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    /*private camera: Camera,*/
    public utilities: UtilitiesProvider,
    public media: MediaProvider,
    public storage: StorageProvider) {
    this.fillGenresPicker();
  }

  fillGenresPicker() {
    this.storage.getFileList("www/Audio/").then((entries: string[]) => {
      entries.forEach(element => {
        // Genres Picker füllen
        this.genres.push(element);
      });
    }, (err) => {
      console.error(JSON.stringify(err).toString())
    });
  }

  fillSubjectsPicker(dir: string) {
    this.storage.getFileList("www/Audio/" + dir + "/").then((entries: string[]) => {
      entries.forEach(element => {
        // Subjects Picker füllen
        let withoutMP3: string = element.substring(0, element.length - 4);
        this.subjects.push(withoutMP3);
      });
    }, (err) => {
      console.error(JSON.stringify(err).toString())
    });
  }

  genreChangedEvent(selectedGenre) {
    this.subjects = [];
    this.subjectID = "";
    this.fillSubjectsPicker(this.genreID);
  }

  /*takeAPicture() {

    this.trigger().then((myBase64: string) => {

      /*var img = new Image();
      img.src = myBase64;
      img.addEventListener('load', function () {
        console.log("-------------------------------------");
        console.log("Size H: " + img.height.toString());
      });

    }, (err) => {
      console.error("takeAPicture(): ", err);
    });

  }*/


  /*trigger() {
    return new Promise((resolve, reject) => {

      let options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
        let myBase64 = 'data:image/jpeg;base64,' + imageData;
        resolve(myBase64);
      }, (err) => {
        reject(err);
      });
    });
  }*/

  logout() {
    this.utilities.logout();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  startRecording() {
    if (this.subjectID === "" || this.duration === 0) {
      this.utilities.giveAlert("Fehler!", "Bitte alle Felder ausfüllen!");
    } else {
      console.log("StarDuell: Start Recording! Genre: " + this.genreID + " Subject: " + this.subjectID + " Duration: " + this.duration);
    }
  }

  uploadVideo() {
    this.storage.getFileList("www/Video/").then((entries: string[]) => {
      if (entries.length >= 1) {
        if(entries[0].substring(entries[0].length-3, entries[0].length) === "mp4"){
          this.media.uploadVideo(entries[0]);
          console.log("StarDuell: Uploading Video: " + entries[0]);
        }  
      }
    }, (err) => {
      console.error(JSON.stringify(err).toString())
    });
  }
}
