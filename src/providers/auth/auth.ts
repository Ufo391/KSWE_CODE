import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  public token: any;

  constructor(private http: Http, public nativeStorage: NativeStorage) {

  }

  checkAuthentication() {

    return new Promise((resolve, reject) => {
      /*
      this.nativeStorage.getItem('myitem')
      .then(
        data => console.log(data),
        error => console.error(error)
      );*/

      //Load token if exists
      /*this.nativeStorage.getItem('token').then((value) => {
 
          this.token = value;
 
          let headers = new Headers();
          headers.append('Authorization', this.token);
 
          this.http.get('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/protected', {headers: headers})
          //this.http.get('TODO', {headers: headers})
              .subscribe(res => {
                  resolve(res);
              }, (err) => {
                  reject(err);
              });
 
      });        */

    });

  }

  createAccount(details) {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/register', JSON.stringify(details), { headers: headers })
        //this.http.post('TODO', JSON.stringify(details), {headers: headers})
        .subscribe(res => {

          let data = res.json();
          this.token = data.token;

          /*
          this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
          .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
          );*/


          //this.nativeStorage.setItem('token', data.token);
          resolve(data);

        }, (err) => {
          reject(err);
        });

    });

  }

  login(credentials) {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/login', JSON.stringify(credentials), { headers: headers })
        //this.http.post('TODO PLATZHALTER', JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {

          let data = res.json();
          this.token = data.token;

          /*
          this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
          .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
          );*/

          //this.nativeStorage.setItem('token', data.token);
          resolve(data);

          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }

  logout() {
    /*
            this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
            .then(
              () => console.log('Stored item!'),
              error => console.error('Error storing item', error)
            );*/

    //this.nativeStorage.setItem('token', '');
  }

}