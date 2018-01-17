import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { MediaProvider } from '../../providers/media/media';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

/**
 * Generated class for the ArchivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-archive',
  templateUrl: 'archive.html',
})
export class ArchivePage {

  items: string[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public utilities: UtilitiesProvider,
    public media: MediaProvider) {
  }

  logout() {
    this.utilities.logout();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  playVideo() {
    this.media.playVideo("sample.mp4").then((result: string) => {
      console.log(result);
    }, (err) => {
      console.error(JSON.stringify(err).toString());
    });
  }

}
