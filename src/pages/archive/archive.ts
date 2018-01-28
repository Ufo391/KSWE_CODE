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

  fillGallery() {
    this.videos = [];

    this.storage.getFileList("www/Video/").then((entries: string[]) => {
      entries.forEach(element => {
        // Liste aller Videos füllen
        this.videos.push(element);
      });
    }, (err) => {
      console.error(JSON.stringify(err).toString())
    });
  }

  logout() {
    this.utilities.logout();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  refresh() {
    console.log("StarDuell: Refresh Gallery")
    this.fillGallery();
  }

  test(){
    this.playVideo("big.mp4");
  }

  playVideo(filename: string) {
    this.media.playVideo(filename).then((result: string) => {
      console.log("StarDuell: " + result);
    }, (err) => {
      if(err === "OK"){
        console.log("StarDuell: Successfully played video: " + filename);
      } else{
        console.error("StarDuell: " + JSON.stringify(err).toString());
      }
    });
  }
}
