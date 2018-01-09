import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ModePage } from '../mode/mode';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
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
		/*
		//Checkt, ob die gespeicherte Session noch auf dem Server aktiv ist.
		this.authProvider.checkAuthentication().then((res) => {
			console.log("Noch angemeldet");
			this.loading.dismiss();
			this.navCtrl.setRoot(ModePage);
		}, (err) => {
			console.log("Nicht mehr angemeldet");
			this.loading.dismiss();
		});
		
		// Session aus dem Native Storage auslesen:
		this.authProvider.getToken().then((res: SessionModel) => {
			if (res == null) {
				console.log(res.getSessionID());
			} else {
			}
		}, (err) => {
			console.log("Doof Login Err");
			this.loading.dismiss();
		});
		*/
	}

	// Auf dem Server anmelden. Ruft die login Methode vom authProvider mit den Login-Daten auf.
	// Bekommt vom authProvider die ServerResponse und reagiert auf diese.
	login() {
		console.log("StarDuell: Anmeldeversuch auf dem Server.");
		// Ladebalken anzeigen
		this.showLoader();

		// Speichert die Anmeldedaten als Objekt.
		let credentials = new CredentialsModel(this.name, this.password);
		console.log("NamePW: " + credentials.getName() + credentials.getPassword())

		// Versucht sich auf dem Server anzumelden.
		this.authProvider.login(credentials).then((result: ServerResponseModel) => {

			// Ladebalken auflösen
			this.loading.dismiss();

			let serverResponse = result;
			console.log("Response: " + serverResponse);

			// Server Response auswerten
			if (serverResponse.getMsg().substring(0,3) === "JWT") {
				console.log("StarDuell: Erfolgreich auf dem Server angemeldet.");

				// Session speichern
				let session: SessionModel = new SessionModel(credentials.getName(), serverResponse.getMsg());
				this.authProvider.setToken(session);
				console.log("StarDuell: SessionID lautet:" + session.getSessionID());

				// Anmeldebereich verlassen
				this.navCtrl.setRoot(ModePage);
				this.navCtrl.push(ModePage);

			} else {
				if (serverResponse.getMsg() === "Authentication failed. Wrong password.") {
					console.error("StarDuell: Falsches Passwort.");
					this.giveAlert("Fehler!", "Falsches Passwort");
				} else if (serverResponse.getMsg() === "User not found.") {
					console.error("StarDuell: Benutzer nicht gefunden.");
					this.giveAlert("Fehler!", "Der Benutzer konnte nicht gefunden werden.");
				}
				else {
					console.log("StarDuell: Login: Success false, Msg: " + serverResponse.getMsg());
				}
			}

		}, (err) => {
			//Keine Kommunikation zum Server möglich.
			this.loading.dismiss();
			console.error("StarDuell: Kommunikationsfehler: " + err.toString());
			this.giveAlert("Fehler!", "Keine Kommunikation mit dem Server");
		});

	}

	// Zeigt einen Anmeldeprozess grafisch dar. (Wartezeit)
	showLoader() {
		this.loading = this.loadingCtrl.create({
			content: 'Authenticating...'
		});

		this.loading.present();
	}

	// Ruft eine Dialogbox mit einem Hinweistext auf.
	giveAlert(titel: string, text: string) {
		let alert = this.alertCtrl.create({
			title: titel,
			subTitle: text,
			buttons: ['OK']
		});
		alert.present();
	}

}