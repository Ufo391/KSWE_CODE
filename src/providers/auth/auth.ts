import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

import { CredentialsModel } from '../../app/models/CredentialsModel';
import { SessionModel, SessionInterface } from '../../app/models/SessionModel';
import { ServerResponseInterface, ServerResponseModel } from '../../app/models/ServerResponseModel';

// Max. Lebensdauer (ms) einer Session auf dem Server.
const MAX_AGE = 100000;

@Injectable()
export class AuthProvider {

  public token: any;

  constructor(public http: Http, public nativeStorage: NativeStorage) {
  }

  // Checken, ob die zuletzt gespeicherte Session noch aktiv ist.
  checkAuthentication(session: SessionModel) {
    return new Promise((resolve, reject) => {

      //-------------------------------------------------------
      // Überprüfe wie alt die SessionID ist (max. MAX_AGE gültig).
      if (session.getAge() > MAX_AGE) {
        reject("Gespeicherte Session ist zu alt.");
      }

      if (session.getAge() <= MAX_AGE)
        resolve("Alles Tutti");

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');

      /*console.log("StarDuell: Starte Anfrage auf: /--------------------------------------------------------------------------");
      // Übermittelt das Token zum Server und überprüft, ob die Session noch aktiv ist.
      // Gibt die Antwort des Servers zurück.
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
        */

    });
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
      headers.append('Access-Control-Allow-Origin', '*');

      console.log("StarDuell: Starte Anfrage auf: /authenticate");
      // Übermittelt die Login-Daten zum Server. Gibt die Antwort des Servers zurück.
      this.http.post('/authenticate', credentials, { headers: headers })
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

  // Speichert eine Session als Token im nativen Speicher.
  setToken(session: SessionModel) {
    this.nativeStorage.setItem('StarDuellToken', JSON.stringify(session))
      .then(
      () => console.log("StarDuell: Session Cookie wurde gespeichert: " + session.getSessionID()),
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