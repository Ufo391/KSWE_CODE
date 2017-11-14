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

            this.debugAusgabe("checkAuthentification()", res[0]);


            if(res[0] == 'true'){
              resolve(data);
            } else {reject();}

          }, (err) => {
            reject(err);
          });

      },
        error => console.error(error)
      );

    });

  }

  createAccount(details) {

    this.debugAusgabe("Auth", "createAccount()");

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

          this.debugAusgabe("createAccount()", res[0]);

        }, (err) => {
          reject(err);
        });

    });

  }

  login(credentials: CredentialsModel) {

    return new Promise((resolve, reject) => {

      /* Später JSON-Objekt mit allen Daten an den Server schicken
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      baut den JSON String:
      JSON.stringify(credentials));*/

      this.http.get(this.server + 'login?password=' + credentials.getPass() + '&id=' + credentials.getEmail(), {})
        .subscribe(res => {

          let data = res.json();

          this.nativeStorage.setItem('token', { tokenValue: data })
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

  logout() {
    this.nativeStorage.setItem('token', { tokenValue: '' })
      .then(
      () => console.log('Reset login token!'),
      error => console.error('Error resetting login token!', error)
      );
  }

  debugAusgabe(titel: string, text: string) {
    let alert = this.alertCtrl.create({
      title: titel,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}