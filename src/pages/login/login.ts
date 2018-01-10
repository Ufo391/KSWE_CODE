import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModePage } from '../mode/mode';

import { AuthProvider } from '../../providers/auth/auth';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

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

	constructor(public navCtrl: NavController, public authProvider: AuthProvider, public utilities: UtilitiesProvider, public navParams: NavParams) {
	}

	// Auf dem Server anmelden. Ruft die login Methode vom authProvider mit den Login-Daten auf.
	// Bekommt vom authProvider die ServerResponse und reagiert auf diese.
	login() {
		console.log("StarDuell: Anmeldeversuch auf dem Server.");
		// Ladebalken anzeigen
		this.utilities.showLoader();

		// Speichert die Anmeldedaten als Objekt.
		let credentials = new CredentialsModel(this.name, this.password);

		// Versucht sich auf dem Server anzumelden.
		this.authProvider.login(credentials).then((result: ServerResponseModel) => {

			// Ladebalken auflösen
			this.utilities.closeLoader();

			let serverResponse = result;

			// Server Response auswerten
			if (serverResponse.getMsg().substring(0, 3) === "JWT") {
				console.log("StarDuell: Erfolgreich auf dem Server angemeldet.");

				// Session speichern
				let session: SessionModel = new SessionModel(credentials.getName(), serverResponse.getMsg());
				this.authProvider.setToken(session);

				// Anmeldebereich verlassen
				this.navCtrl.setRoot(ModePage);
				this.navCtrl.push(ModePage);

			} else {
				if (serverResponse.getMsg() === "Authentication failed. Wrong password.") {
					console.error("StarDuell: Falsches Passwort.");
					this.utilities.giveAlert("Fehler!", "Falsches Passwort");
				} else if (serverResponse.getMsg() === "User not found.") {
					console.error("StarDuell: Benutzer nicht gefunden.");
					this.utilities.giveAlert("Fehler!", "Der Benutzer konnte nicht gefunden werden.");
				}
				else {
					console.log("StarDuell: Login: Success false, Msg: " + serverResponse.getMsg());
				}
			}

		}, (err) => {
			//Keine Kommunikation zum Server möglich.
			this.utilities.closeLoader();
			console.error("StarDuell: Kommunikationsfehler: " + err.toString());
			this.utilities.giveAlert("Fehler!", "Keine Kommunikation mit dem Server");
		});

	}

}