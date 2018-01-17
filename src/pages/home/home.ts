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
export class HomePage {

  constructor(public navCtrl: NavController,
    public authProvider: AuthProvider,
    public utilities: UtilitiesProvider) {

  }

  ionViewDidLoad() {
    this.utilities.showLoader();
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

  openLogin() {
    this.navCtrl.push(LoginPage);
  }

  openRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
