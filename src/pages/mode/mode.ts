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
	//this.initializeItems();	
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
		this.navCtrl.popToRoot();		
  }

 /* public initializeItems() {
	this.items
	 = [
		'Harry',
		'Potter',
		'Ron',
		'Weasley',
		'Cartman',
		'Kenny',
		'Butters',
		'Stan'
	];
}

getItems(ev: any) {
	this.initializeItems();
	let val = ev.target.value;
	if (val && val.trim() != '') {
		this.items = this.items.filter((item) => {
	  return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
		  })
		}
  }
*/
}
