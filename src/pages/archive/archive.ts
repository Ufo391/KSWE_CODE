import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { MediaProvider } from '../../providers/media/media';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-archive',
  templateUrl: 'archive.html',
})

/**
 * Die Klasse ArchivePage kümmert sich um den Inhalt der Seite "Archive".
 */
export class ArchivePage {

  videos: Array<string> = [];
  videoID: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public utilities: UtilitiesProvider,
    public media: MediaProvider,
    public storage: StorageProvider) {
    this.fillGallery();
  }

  // Füllt die Gallerie mit Videos, die im Speicher gefunden wurden.
  fillGallery() {
    this.videos = [];

    // Liest den nativen Gerätespeicher aus und fügt für jedes Video ein Element hinzu.
    // TODO: Video Urls vom Server bekommen und als Element hinzufügen.
    this.storage.getFileList("www/Video/").then((entries: string[]) => {
      entries.forEach(element => {
        // Liste aller Videos füllen
        this.videos.push(element);
      });
    }, (err) => {
      console.error(JSON.stringify(err).toString())
    });
  }

  // Meldet den User ab und lässt ihn zur Startseite zurückkehren.
  logout() {
    this.utilities.logout();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  // Lässt die Gallerie neu laden.
  refresh() {
    console.log("StarDuell: Refresh Gallery")
    this.fillGallery();
  }

  // Registriert ein positives Votum für das zugehörige Video.
  voteUp(video: string) {
    console.log("StarDuell: Upvote: " + video);
    // TODO: Votum dem Server mitteilen.
  }

  // Registriert ein negatives Votum für das zugehörige Video.
  voteDown(video: string) {
    console.log("StarDuell: Downvote: " + video);
    //TODO: Votum dem Server mitteilen.
  }

}
