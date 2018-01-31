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

/**
 * Die Klasse ModePage kümmert sich um den Inhalt der Seite "Mode".
 */
export class ModePage {

  items: string[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public utilities: UtilitiesProvider) {
  }

  // Öffnet die Seite "Record".
  openOptions() {
    this.navCtrl.push(OptionsPage);
  }

  // Öffnet die Seite "Archive".
  openArchive() {
    this.navCtrl.push(ArchivePage);
  }

  // Meldet den User ab und lässt ihn zur Startseite zurückkehren.
  logout() {
    this.utilities.logout();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  // Öffnet die Seite "Judge".
  openRating() {
    this.navCtrl.push(RatingPage);
  }

}
