import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import { CredentialsModel } from '../../app/models/CredentialsModel';
import { SessionModel, SessionInterface } from '../../app/models/SessionModel';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  public token: any;

  constructor(private http: Http, public nativeStorage: NativeStorage, public alertCtrl: AlertController) {
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
  createAccount(credentials: CredentialsModel) {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      //create: (POST http://localhost:3000/api/authenticate)
      /*schicken:
      {
        "name": "Andreas",
        "password": "pass"
      }*/

      /*bekommen:
      {
        "success": false,
        "msg": "Successful created new user."
      }*/

      //Web Example:
      //this.http.post('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/register', JSON.stringify(details), { headers: headers })

      console.log("StarDuell: Starte Anfrage auf: api/authenticate");
      this.http.post('api/authenticate', JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {

          let data = res.json();

          resolve(data);

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

      // login: (POST http://localhost:3000/api/signup)
      /* schicken:
      {
        "name": "Andreas",
        "password": "pass"
      }*/

      /*bekommen:
      {
        "success": false,
        "msg": "Authentication failed. Wrong password."
      }*/

      // Funktionierte bei Server 1.0
      // this.http.get(this.server + 'login?password=' + credentials.getPass() + '&id=' + credentials.getEmail(), {})
      // Server aktuell:
      // Übermittelt die Login-Daten zum Server. Gibt die Antwort des Servers zurück.
      console.log("StarDuell: Starte Anfrage auf: api/signup");
      this.http.post('api/signup', JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {

          let data = res.json();

          //Hier kam true oder false an:
          //console.log("returnData: " + data);

          resolve(data);
        }, (err) => {
          reject(err);
        });

    });
  }

  // Vom Server abmelden
  // Löscht Session Cookie vom Storage
  logout() {
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