import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import { CredentialsModel } from '../../app/models/CredentialsModel';
import { SessionModel, SessionInterface } from '../../app/models/SessionModel';
import 'rxjs/add/operator/map';
import { ServerResponseInterface, ServerResponseModel } from '../../app/models/ServerResponseModel';

@Injectable()
export class AuthProvider {

  public token: any;

  constructor(public http: Http, public nativeStorage: NativeStorage, public alertCtrl: AlertController) {
  }

  // Checken, ob die zuletzt gespeicherte Session noch aktiv ist.
  checkAuthentication() {

    /*return new Promise((resolve, reject) => {

    //Load token if exists
    this.nativeStorage.getItem('token').then((data) => {

      this.token = data;

      let headers = new Headers();
      headers.append('Authorization', this.token);

      //this.http.get('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/protected', { headers: headers })
      //this.http.get('TODO', {headers: headers})

      this.http.get('http://localhost:3000/login?password=pass&id=5')
        //this.http.post('TODO PLATZHALTER', JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {



          if (res[0] == 'true') {
            resolve(data);
          } else  { reject(); }

        }, (err) => {
          reject(err);
        });
        

    },
      error => console.error(error)
    );

    });*/

  }

  // Account anlegen (registrieren)
  register(credentials: CredentialsModel) {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');

      console.log("StarDuell: Starte Anfrage auf: /signup");
      // Übermittelt die Registrier-Daten zum Server. Gibt die Antwort des Servers zurück.
      this.http.post('/signup', credentials, { headers: headers })
        .subscribe(data => {

          // JSON String parsen.
          let tempResponse: ServerResponseInterface = JSON.parse(JSON.stringify(data.json()));
          // ServerResponseModel-Object erstellen.
          let response: ServerResponseModel = new ServerResponseModel(tempResponse.success, tempResponse.msg);
          // SessionModel zurückgeben.
          resolve(response);

        }, (err) => {
          reject(err);
        });

    });

  }

  // Auf dem Server anmelden. Gibt die Server Response zurück.
  login(credentials: CredentialsModel) {

    return new Promise((resolve, reject) => {

      // Anfrage als Typ JSON-Object festlegen.
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      //headers.append ('Content-Type', 'application/x-www-form-urlencoded')
      headers.append('Access-Control-Allow-Origin', '*');

      console.log("StarDuell: Starte Anfrage auf: /authenticate");
      // Übermittelt die Login-Daten zum Server. Gibt die Antwort des Servers zurück.
      // http://minden.froese-energieausholz.de:3000/api/authenticate
      this.http.post('/authenticate', credentials, { headers: headers })
        .subscribe(data => {

          console.log("1");
          // JSON String parsen.
          let tempResponse: ServerResponseInterface = JSON.parse(JSON.stringify(data.json()));
          // ServerResponseModel-Object erstellen.
          let response: ServerResponseModel = new ServerResponseModel(tempResponse.success, tempResponse.msg);
          // SessionModel zurückgeben.
          console.log("2")
          resolve(response);

          console.log("3 " + response);
        }, (err) => {
          console.log("4 " + err);
          reject(err);
        });

    });
  }

  // Vom Server abmelden
  // Löscht Session Cookie vom Storage
  logout() {
    this.nativeStorage.remove("StarDuellToken");
  }

  // Speichert eine Session als Token im nativen Speicher.
  setToken(session: SessionModel) {
    this.nativeStorage.setItem('StarDuellToken', JSON.stringify(session))
      .then(
      () => console.log("StarDuell: Session Cookie wurde gespeichert."),
      error => console.error("StarDuell: Session Cookie wurde nicht gespeichert: ", error)
      );
  }

  // Liest die gespeicherte Session aus dem nativen Speicher aus und gibt sie zurück.
  getToken() {
    return new Promise((resolve, reject) => {

      // Session Daten aus dem Speicher auslesen.
      this.nativeStorage.getItem('StarDuellToken').then(
        data => {
          console.log("StarDuell: Session Cookie wurde gefunden.")

          // JSON String parsen.
          let tempSession: SessionInterface = JSON.parse(data);
          // SessionModel-Object erstellen.
          let session: SessionModel = new SessionModel(tempSession.name, tempSession.sessionID);
          session.setTimeStamp(tempSession.timeStamp);
          // SessionModel zurückgeben.
          resolve(session);
        },
        error => {
          console.error("StarDuell: Session Cookie wurde nicht gefunden: ", error)
          reject(error);
        }
      );

    });

  }
}