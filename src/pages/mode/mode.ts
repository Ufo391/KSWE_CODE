import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OptionsPage } from '../options/options';
import { ArchivePage } from '../archive/archive';
import { HomePage } from '../home/home';
import { RatingPage } from '../rating/rating';

import { UtilitiesProvider } from '../../providers/utilities/utilities';

@IonicPage()
@Component({
  selector: 'page-mode',
  templateUrl: 'mode.html',
})
export class ModePage {

  items: string[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public utilities: UtilitiesProvider) {
  }

  openOptions() {
    this.navCtrl.push(OptionsPage);
  }

  openArchive() {
    this.navCtrl.push(ArchivePage);
  }

  logout() {
    this.utilities.logout();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  openRating() {
    this.navCtrl.push(RatingPage);
  }

}
