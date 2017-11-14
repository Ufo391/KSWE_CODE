import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ModePage } from '../mode/mode';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { CredentialsModel } from '../../app/models/CredentialsModel';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	//TODO email = uname ?
	email: string;
	password: string;
	loading: any;

	constructor(public navCtrl: NavController, public authProvider: AuthProvider, public loadingCtrl: LoadingController, public navParams: NavParams, public alertCtrl: AlertController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');

		//Check if already authenticated
		this.authProvider.checkAuthentication().then((res) => {
			console.log("Already authorized");
			this.loading.dismiss();
			this.navCtrl.setRoot(HomePage);
		}, (err) => {
			console.log("Not already authorized");
			this.loading.dismiss();
		});
	}

	login() {

		this.showLoader();

		let credentials = new CredentialsModel(this.email, this.password);

		this.authProvider.login(credentials).then((result) => {

			this.loading.dismiss();
			console.log(result);

			this.navCtrl.setRoot(ModePage);
			this.navCtrl.push(ModePage);

		}, (err) => {
			this.loading.dismiss();
			console.log(err);
			this.debugAusgabe("login() error", err[0]);
		});

		//TODO Antwort des Servers auswerten (true und false)
		

		/*
  	if(this.uname.value == "admin" && this.password.value == "admin") {
  	  	this.navCtrl.push(ModePage);

  	} else {
  		let alert = this.alertCtrl.create({
  			title: 'Fuck You!',
  			subTitle: 'You entered incorrect data....admin,admin',
  			buttons: ['OK']
  		});
  		alert.present();
		}*/
	}

	showLoader() {
		this.loading = this.loadingCtrl.create({
			content: 'Authenticating...'
		});

		this.loading.present();
	}

	debugAusgabe(titel: string, text: string) {
		let alert = this.alertCtrl.create({
		  title: titel,
		  subTitle: text,
		  buttons: ['OK']
		});
		alert.present();
	  }

}