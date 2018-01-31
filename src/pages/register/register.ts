import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModePage } from '../mode/mode';

import { AuthProvider } from '../../providers/auth/auth';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

import { CredentialsModel } from '../../app/models/CredentialsModel';
import { ServerResponseModel } from '../../app/models/ServerResponseModel';
//import { SessionModel } from '../../app/models/SessionModel';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

/**
 * Die Klasse RegisterPage kümmert sich um den Inhalt der Seite "Sign Up".
 */
export class RegisterPage {

  name: string;
  password: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public utilities: UtilitiesProvider) {
  }

  // Neuen Benutzer auf dem Server registrieren. Ruft die register Methode vom authProvider mit den Benutzerdaten auf.
  // Bekommt vom authProvider die ServerResponse und reagiert auf diese.
  register() {

    console.log("StarDuell: Registriere neuen Benutzer auf dem Server.");
    // Ladebalken anzeigen
    this.utilities.showLoader("Authenticating...");

    // Speichert die Registrierungsdaten als Objekt.
    let credentials = new CredentialsModel(this.name, this.password);

    // Versucht sich beim Server zu registrieren.
    this.authProvider.register(credentials).then((result: ServerResponseModel) => {

      // Ladebalken auflösen
      this.utilities.closeLoader();

      let serverResponse = result;

      // Server Response auswerten
      if (serverResponse.getMsg() === "User created.") {
        console.log("StarDuell: Erfolgreich neuen Benutzer erstellt.");

        this.utilities.giveAlert("Registrierung", "Sie haben sich erfolgreich bei StarDuell registriert!");

        // Anmeldebereich verlassen
        this.navCtrl.setRoot(ModePage);
        this.navCtrl.push(ModePage);
      } else {
        if (serverResponse.getMsg() === "Please pass name and password.") {
          console.error("StarDuell: Register: Wrong input data.");
          this.utilities.giveAlert("Fehler!", "Falsche Eingabedaten. Geben Sie bitte in beide Felder etwas ein.");
        } else if (serverResponse.getMsg() === "Name is assigned.") {
          console.log("StarDuell: Register: User exists already.");
          this.utilities.giveAlert("Fehler!", "Der User existiert bereits.");
        } else {
          console.error("StarDuell: Register: Msg: " + serverResponse.getMsg());
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