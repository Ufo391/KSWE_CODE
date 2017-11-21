import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ModePage } from '../mode/mode';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { CredentialsModel } from '../../app/models/CredentialsModel';
import { ServerResponseModel } from '../../app/models/ServerResponseModel';
import { SessionModel } from '../../app/models/SessionModel';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	name: string;
	password: string;
	loading: any;

	constructor(public navCtrl: NavController, public authProvider: AuthProvider, public loadingCtrl: LoadingController, public navParams: NavParams, public alertCtrl: AlertController) {
	}

	ionViewDidLoad() {

		let session: SessionModel = new SessionModel("Andreas", "doof");

		this.authProvider.setToken(session);

		//Checkt, ob die gespeicherte Session noch auf dem Server aktiv ist.
		this.authProvider.checkAuthentication().then((res) => {
			console.log("Noch angemeldet");
			this.loading.dismiss();
			this.navCtrl.setRoot(HomePage);
		}, (err) => {
			console.log("Nicht mehr angemeldet");
			this.loading.dismiss();
		});
	}

	login() {
		//Zeigt JSON String an:
		//this.authProvider.getToken().then((res:string) => {
		//console.log(res.toString())

		this.authProvider.getToken().then((res:SessionModel) => {
			if (res == null) {
				console.log("doof gelaufen");
			} else {
				//console.log("Als JSON String: " + res)


				/*interface MyObj {
					name: string;
					sessionID: string;
					timeStamp: Date;
				}
				
				let obj: MyObj = JSON.parse(res);
				console.log('Nur Name: ' + obj.name);*/

				console.log('Name: ' + res.getName());
				console.log('SessionID: ' + res.getSessionID());
				console.log('Age: ' + (res.getAge()/1000).toString());

				/*
				console.log("Session: " + res.getName() +
					", " + res.getSessionID() +
					", " + (res.getAge() / 1000).toString())*/
			}
		}, (err) => {
			console.log("Doof Login Err");
			this.loading.dismiss();
		});

		this.showLoader();

		//Speichert die Anmeldedaten als Objekt.
		let credentials = new CredentialsModel(this.name, this.password);

		this.authProvider.login(credentials).then((result: ServerResponseModel) => {

			this.loading.dismiss();

			/*Vergleicht, ob der Login-Vorgang erfolgreich war.
			if (result.toString() === "true") {
				//TODO Zurück-Pfeil entfernen
				//Logout hinzufügen
				this.navCtrl.setRoot(ModePage);
				this.navCtrl.push(ModePage);
			} else {
				this.giveAlert("Fehler!", "Falsche Login-Daten");
			}*/

			let serverResponse = result;

			if (serverResponse.succeed()) {
				if (serverResponse.getMsg() === "TODO Msg-Typen vom Server unterscheiden.") {
					this.navCtrl.setRoot(ModePage);
					this.navCtrl.push(ModePage);
				} else {

				}
			} else {
				if (serverResponse.getMsg() === "Authentication failed. Wrong password.") {
					this.giveAlert("Fehler!", "Falsche Login-Daten");
				} else {

				}
			}

		}, (err) => {
			//Keine Kommunikation zum Server möglich.
			this.loading.dismiss();
			console.log("Login Error: " + err.toString());
			//this.giveAlert("Fehler!", "Keine Kommunikation mit dem Server");
		});

	}

	showLoader() {
		this.loading = this.loadingCtrl.create({
			content: 'Authenticating...'
		});

		this.loading.present();
	}

	giveAlert(titel: string, text: string) {
		let alert = this.alertCtrl.create({
			title: titel,
			subTitle: text,
			buttons: ['OK']
		});
		alert.present();
	}

}