import { Component, NgZone } from '@angular/core';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SmartAudio } from '../../providers/smart-audio/smart-audio';



/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})

export class OptionsPage {

  private image: string;  
  play = false;
  items;
  path = 'C:/Users/Eddy/Desktop/swe/src/assets/audio/';
  savedParentNativeURLs = [];
  
  
  


  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public smartAudio: SmartAudio, private file: File, )  {
    this.smartAudio.preload('instrumental', 'assets/audio/Say no more.mp3');  
    const ROOT_DIRECTORY = 'file:///';
    
    this.platform.ready().then(() => {
      this.listDir(ROOT_DIRECTORY, '');
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

  logout() {
    this.navCtrl.setRoot(HomePage);    
    this.navCtrl.popToRoot();

  }

  playAudio() {    
    
      this.smartAudio.play('assets/audio/Say no more.mp3');

  }
  
  handleError = (error) => {
    console.log('error reading,', error)
  };
  
  listDir = (path, dirName) => {
    this.file.listDir(path, dirName)
    .then((entries) => {
      this.items = entries;
    })
    .catch(this.handleError);
  }

}
