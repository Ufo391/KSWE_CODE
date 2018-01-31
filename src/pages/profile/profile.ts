import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

/**
 * Die Klasse ProfilePage kümmert sich um den Inhalt der Seite "Profile".
 */
export class ProfilePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
  }

  // Meldet den User ab und lässt ihn zur Startseite zurückkehren.
  logout() {
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  // Öffnet die Seite "Profile".
  openProfile() {
    this.navCtrl.push(ProfilePage);
  }

}
