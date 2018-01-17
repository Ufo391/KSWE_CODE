import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomePage } from '../home/home';

import { StorageProvider } from '../../providers/storage/storage';
import { MediaProvider } from '../../providers/media/media';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

import { ServerResponseModel } from '../../app/models/ServerResponseModel';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    /*private camera: Camera,*/
    public utilities: UtilitiesProvider,
    public media: MediaProvider,
    public storage: StorageProvider) {
  }

  /*takeAPicture() {

    this.trigger().then((myBase64: string) => {


      /*var img = new Image();
      img.src = myBase64;
      img.addEventListener('load', function () {
        console.log("-------------------------------------");
        console.log("Size H: " + img.height.toString());
      });



    }, (err) => {
      console.error("takeAPicture(): ", err);
    });

  }*/

  /*trigger() {
    return new Promise((resolve, reject) => {

      let options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
        let myBase64 = 'data:image/jpeg;base64,' + imageData;
        resolve(myBase64);
      }, (err) => {
        reject(err);
      });
    });
  }*/

  logout() {
    this.utilities.logout();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  uploadVideo() {
    this.storage.readFileAsBinary("www/Video/small.mp4").then((data: string) => {

      this.media.uploadVideo(data).then((result: ServerResponseModel) => {
        console.log("HalliHallo: " + result.getMsg());
      }, (err) => {
        console.error(JSON.stringify(err).toString());
      });

    }, (err) => {
      console.error(JSON.stringify(err).toString());
    });
  }
}
