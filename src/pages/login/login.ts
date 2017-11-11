import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModePage } from '../mode/mode';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	@ViewChild('username') uname;
	@ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn() {
  	if(this.uname.value == "admin" && this.password.value == "admin") {
  	  	this.navCtrl.push(ModePage);

  	} else {
  		let alert = this.alertCtrl.create({
  			title: 'Fuck You!',
  			subTitle: 'You entered incorrect data....admin,admin',
  			buttons: ['OK']
  		});
  		alert.present();
  	}
  }

}
