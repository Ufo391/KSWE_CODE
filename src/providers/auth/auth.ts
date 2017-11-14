import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import { CredentialsModel } from '../../app/models/CredentialsModel';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  public token: any;
  private server: string = "api/";

  constructor(private http: Http, public nativeStorage: NativeStorage, public alertCtrl: AlertController) {
  }

  // Checken, ob die zuletzt gespeicherte Session noch aktiv ist.
  checkAuthentication() {

    return new Promise((resolve, reject) => {

      this.nativeStorage.getItem('myitem')
        .then(
        data => console.log(data),
        error => console.error(error)
        );

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

    });

  }

  // Account anlegen (registrieren)
  createAccount(details) {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/register', JSON.stringify(details), { headers: headers })
        //this.http.post('TODO', JSON.stringify(details), {headers: headers})
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

    return new Promise((resolve, reject) => {

      /* TODO Später JSON-Objekt mit allen Daten an den Server schicken
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      baut den JSON String:
      JSON.stringify(credentials));*/

      this.http.get(this.server + 'login?password=' + credentials.getPass() + '&id=' + credentials.getEmail(), {})
        .subscribe(res => {

          let data = res.json();

          //Hier kommt true oder false an:
          console.log("returnData: " + data);

          //TODO Session ID im Storage speichern (funktioniert noch nicht)
          this.nativeStorage.setItem('token', { tokenValue: "hallo" })
            .then(
            () => console.log('Stored login token!'),
            error => console.error('Error storing login token!', error)
            );

          //Zum Testen auslesen
          /*this.nativeStorage.getItem('token').then((datas) => {
            this.debugAusgabe("TokenValue", datas);
          },
            error => console.error(error)
          );*/

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

}