import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import { CredentialsModel } from '../../app/models/CredentialsModel';
import { SessionModel } from '../../app/models/SessionModel';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  public token: any;

  constructor(private http: Http, public nativeStorage: NativeStorage, public alertCtrl: AlertController) {
  }

  // Checken, ob die zuletzt gespeicherte Session noch aktiv ist.
  checkAuthentication() {

    return new Promise((resolve, reject) => {

      /*
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
    );*/

    });

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
      this.http.post('api/authenticate', JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {

          let data = res.json();
          this.token = data.token;

          this.nativeStorage.setItem('token', { tokenValue: data.token })
            .then(
            () => console.log('Stored login token!'),
            error => console.error('Error storing login token!', error)
            );

          resolve(data);

        }, (err) => {
          reject(err);
        });

    });

  }

  // Auf dem Server anmelden
  // Speichert Session als Cookie im Storage ab
  login(credentials: CredentialsModel) {

    //TODO löschen
    /*this.nativeStorage.getItem('token').then(
      data => {

        class Iwas {
          tokenValue: string;
        }
        let iwas: Iwas = data;
        console.log("----- TokenValue: " + data)
        console.log("----- TokenValue: " + iwas.tokenValue)


      },
      error => console.error(error)
      );*/

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      //login: (POST http://localhost:3000/api/signup)
      /*schicken:
      {
        "name": "Andreas",
        "password": "pass"
      }*/

      /*bekommen:
      {
        "success": false,
        "msg": "Authentication failed. Wrong password."
      }*/

      //Funktionierte bei Server 1.0
      //this.http.get(this.server + 'login?password=' + credentials.getPass() + '&id=' + credentials.getEmail(), {})
      //Server aktuell:
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
    // TODO Vom Server abmelden
    this.nativeStorage.setItem('token', { tokenValue: '' })
      .then(
      () => console.log('Reset login token!'),
      error => console.error('Error resetting login token!', error)
      );
  }

  //Speichert eine Session als Token im nativen Speicher
  setToken(session: SessionModel) {
    this.nativeStorage.setItem('StarDuellToken', JSON.stringify(session))
      .then(
      () => console.log('----- Stored login token!'),
      error => console.error('----- Error storing login token!', error)
      );
  }

  //Liest die gespeicherte Session aus dem nativen Speicher aus
  getToken() {
    return new Promise((resolve, reject) => {

      this.nativeStorage.getItem('StarDuellToken').then(
        data => {
          console.log("----- Found login token!")

          interface SessionInterface {
            name: string;
            sessionID: string;
            timeStamp: number;
          }

          let tempSession: SessionInterface = JSON.parse(data);
          let session: SessionModel = new SessionModel(tempSession.name, tempSession.sessionID);
          session.setTimeStamp(tempSession.timeStamp);
          resolve(session);
        },
        error => {
          console.error('----- Error while searching for login token!', error)
          reject(error);
        }
      );

    });

  }
}