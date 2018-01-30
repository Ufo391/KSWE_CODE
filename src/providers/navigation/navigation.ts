import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
//import { HomePage } from '../../pages/home/home';
//import { ArchivePage } from '../../pages/archive/archive';
//import { RegisterPage } from '../../pages/register/register';
//import { LoginPage } from '../../pages/login/login';
//import { ModePage } from '../../pages/mode/mode';
//import { OptionsPage } from '../../pages/options/options';
//import { ProfilePage } from '../../pages/profile/profile';


import 'rxjs/add/operator/map';


/*
  Generated class for the NavigationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NavigationProvider {

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {

  }

  logout() {
    //this.navCtrl.setRoot(HomePage);    
    //this.navCtrl.popToRoot();

  }

  openOptions() {
    //this.navCtrl.push(OptionsPage);
  }





}
