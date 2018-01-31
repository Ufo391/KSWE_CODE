import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { StorageProvider } from '../../providers/storage/storage';
import { MediaProvider } from '../../providers/media/media';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})

/**
 * Die Klasse OptionsPage kümmert sich um den Inhalt der Seite "Record".
 */
export class OptionsPage {

  genres: Array<string> = [];
  titles: Array<string> = [];
  playTitle: Array<string> = [];
  genreID: string = "";
  titleID: string = "";
  subjectID: string = "";
  duration: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public utilities: UtilitiesProvider,
    public media: MediaProvider,
    public storage: StorageProvider) {
    this.fillGenresPicker();
  }

  // Liest eine Liste an Genre-Ordnern aus dem nativen Gerätespeicher aus und stellt diese Liste im Genre-Picker dar.
  fillGenresPicker() {
    this.storage.getFileList("www/Audio/").then((entries: string[]) => {
      entries.forEach(element => {
        // Subjects Picker füllen
        this.genres.push(element);
      });
    }, (err) => {
      console.error(JSON.stringify(err).toString())
    });
  }

  // Liest eine Liste an Titeln im jeweiligen Genre-Ordner aus dem nativen Gerätespeicher aus und stellt diese Liste im Titel-Picker dar.
  fillTitlesPicker(dir: string) {
    this.storage.getFileList("www/Audio/" + dir + "/").then((entries: string[]) => {
      entries.forEach(element => {
        // Titles Picker füllen 
        let withoutMP3: string = element.substring(0, element.length - 4);
        this.titles.push(withoutMP3);
      });
    }, (err) => {
      console.error(JSON.stringify(err).toString())
    });
  }

  // Löscht die gespeicherten Angaben und füllt den Titel-Picker neu.
  genreChangedEvent(selectedGenre) {
    this.titles = [];
    this.playTitle = [];
    this.subjectID = "";
    this.fillTitlesPicker(this.genreID);
  }

  // Öffnet oder erneuert die Titel-Vorschau.
  titleChangedEvent(selectedTitle) {
    this.playTitle = [];
    this.playTitle.push(this.titleID);
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

  // Meldet den User ab und lässt ihn zur Startseite zurückkehren.
  logout() {
    this.utilities.logout();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  // Startet die Video-Aufnahme mit den eingestellten Parametern.
  startRecording() {
    // TODO: Video-Aufnahme implementieren.
    if (this.subjectID === "" || this.titleID === "" || this.duration === 0) {
      this.utilities.giveAlert("Fehler!", "Bitte alle Felder ausfüllen!");
    } else {
      console.log("StarDuell: Start Recording! Genre: " + this.genreID + " Subject: " + this.subjectID + " Duration: " + this.duration);
    }
  }

  // Lädt das aufgenommene Video auf den Server hoch.
  uploadVideo() {
    // Lädt ein  Video aus dem nativen Gerätespeicher auf den Server hoch (falls mind. eins vorhanden ist).
    this.storage.getFileList("www/Video/").then((entries: string[]) => {
      if (entries.length >= 1) {
        if (entries[0].substring(entries[0].length - 3, entries[0].length) === "mp4") {
          this.media.uploadVideo(entries[0]);
          console.log("StarDuell: Uploading Video: " + entries[0]);
        }
      }
    }, (err) => {
      console.error(JSON.stringify(err).toString())
    });
  }
}
