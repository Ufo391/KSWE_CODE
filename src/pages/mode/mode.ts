import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OptionsPage } from '../options/options';
import { ArchivePage } from '../archive/archive';
import { HomePage } from '../home/home';

/**
 * Generated class for the ModePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mode',
  templateUrl: 'mode.html',
})
export class ModePage {

	items: string[];	

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModePage');
  }

  openOptions() {
  	this.navCtrl.push(OptionsPage);
  }

  openArchive() {
  	this.navCtrl.push(ArchivePage);
  }

  logout() {
    this.navCtrl.setRoot(HomePage);
		this.navCtrl.popToRoot();		
  }

}
