import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ModePage } from '../mode/mode';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  //TODO email = uname ?
  email: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {

    this.showLoader();

    let details = {
      email: this.email,
      password: this.password
    };

    this.authService.createAccount(details).then((result) => {
      this.loadingCtrl
      console.log(result);
      this.navCtrl.setRoot(ModePage);
    }, (err) => {
      this.loading.dismiss();
    });

  }

  showLoader() {

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}