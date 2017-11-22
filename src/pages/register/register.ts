import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ModePage } from '../mode/mode';
import { CredentialsModel } from '../../app/models/CredentialsModel';
import { ServerResponseModel } from '../../app/models/ServerResponseModel';
//import { SessionModel } from '../../app/models/SessionModel';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  //TODO email = uname ?
  name: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  }

  // Neuen Benutzer auf dem Server registrieren. Ruft die register Methode vom authProvider mit den Benutzerdaten auf.
  // Bekommt vom authProvider die ServerResponse und reagiert auf diese.
  register() {

    console.log("StarDuell: Registriere neuen Benutzer auf dem Server.");
    // Ladebalken anzeigen
    this.showLoader();

    // Speichert die Registrierungsdaten als Objekt.
    let credentials = new CredentialsModel(this.name, this.password);

    // Versucht sich beim Server zu registrieren.
    this.authProvider.register(credentials).then((result: ServerResponseModel) => {

      // Ladebalken auflösen
      this.loading.dismiss();

      let serverResponse = result;

      // Server Response auswerten
      if (serverResponse.succeed()) {
        if (serverResponse.getMsg() === "Successful created new user.") {
          console.log("StarDuell: Erfolgreich neuen Benutzer erstellt.");

          // TODO Session speichern
					/*let session: SessionModel = new SessionModel(credentials.getName(), serverResponse.getMsg());
					this.authProvider.setToken(session);
					console.log("StarDuell: SessionID lautet:" + session.getSessionID());*/

          // Anmeldebereich verlassen
          this.navCtrl.setRoot(ModePage);
          this.navCtrl.push(ModePage);
        } else {
          console.log("StarDuell: Register: Success true, Msg: " + serverResponse.getMsg());
        }
      } else {
        if (serverResponse.getMsg() === "Please pass name and password.") {
          console.error("StarDuell: Register: Wrong POST api.");
          this.giveAlert("Fehler!", "App-Fehler beim Registrier-Vorgang");
        } else if (serverResponse.getMsg() === "TODO User exists already") {
          console.log("StarDuell: Register: User exists already.");
          this.giveAlert("Fehler!", "Der User existiert bereits.");
        } else {
          console.error("StarDuell: Register: Success false, Msg: " + serverResponse.getMsg());
        }
      }

    }, (err) => {
      //Keine Kommunikation zum Server möglich.
      this.loading.dismiss();
      console.error("StarDuell: Kommunikationsfehler: " + err.toString());
      this.giveAlert("Fehler!", "Keine Kommunikation mit dem Server");
    });

  }

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