import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { ModePage } from '../mode/mode';

import { AuthProvider } from '../../providers/auth/auth';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/**
 * Die Klasse HomePage kümmert sich um den Inhalt der Startseite.
 */
export class HomePage {

  constructor(public navCtrl: NavController,
    public authProvider: AuthProvider,
    public utilities: UtilitiesProvider) {

  }

  // Checkt zu beginn, ob eine Session im Speicher vorhanden ist und ob diese aktuell ist.
  // Bei erfolgreicher Prüfung wird der Nutzer gleich auf die Seite "Mode" weitergeleitet.
  ionViewDidLoad() {
    this.utilities.showLoader("Authenticating...");
    //Checkt, ob die gespeicherte Session noch auf dem Server aktiv ist.
    this.authProvider.checkAuthentication().then((res) => {
      console.log("StarDuell: Noch angemeldet.");
      this.utilities.closeLoader();
      this.navCtrl.setRoot(ModePage);
    }, (err) => {
      console.log("Nicht mehr angemeldet.");
      this.utilities.closeLoader();
    });
  }

  // Öffnet die Seite "Sign In".
  openLogin() {
    this.navCtrl.push(LoginPage);
  }

  // Öffnet die Seite "Sign Up".
  openRegister() {
    this.navCtrl.push(RegisterPage);
  }

  // Öffnet die Seite "Mode".
  // Nur für Entwickler, die sich nicht jedes Mal anmelden wollen.
  dummyLogin() {
    this.navCtrl.setRoot(ModePage);
  }

}
