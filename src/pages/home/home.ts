import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { ModePage } from '../mode/mode';
import { ProfilePage } from '../profile/profile';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openLogin() {
  	this.navCtrl.push(LoginPage);
  }

  openRegister() {
  	this.navCtrl.push(RegisterPage);
  }

  forceLogin() {
  	this.navCtrl.push(ModePage);
  }

}
