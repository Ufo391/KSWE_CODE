import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
//import * as io from 'socket.io-client';

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

  // TODO löschen ----------------------------------------------------------------------------------------------------------------
  /*socket:any;
  chat_input:string;
  chats = [];*/

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private file: File) {

    console.log(this.file.applicationDirectory);
    this.file.checkDir(this.file.applicationDirectory, 'bild.jpg').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesnt exist'));
    /*this.socket = io('http://localhost:3000');
    
        this.socket.on('message', (msg) => {
          console.log("message", msg);
          this.chats.push(msg);
        });*/
  }

  /*send(msg) {
    if (msg != '') {
      this.socket.emit('message', msg);
    }
    this.chat_input = '';
  } */


  createFile(imgString) {

    var img = new Image();
    img.src = imgString;
    img.addEventListener('load', (event) => {
      console.log(1);
      this.file.getFreeDiskSpace().then((value: number) => {
        console.log("2 - " + value);
        if ((img.height * img.width) / 1000.0 < value) {
          console.log(3);
          this.file.writeFile(this.file.applicationDirectory, "bild.jpg", imgString, { replace: true }).then(() => {
            console.log(4);
            this.file.checkFile(this.file.applicationDirectory, "bild.jpg").then(_ => console.log('File exists')).catch(err => console.log('File doesnt exist'));
          }), (err) => { console.log(5); };

        }
      }, (err) => {
        console.error("takeAPicture(): ", err);
      });

    });


  };

  /*sendViaFtp(message: string) {
    console.log("FTP 1");
    this.fTP.connect('ftp.strato.de', 'ftp_test@m.froese-energieausholz.de', 'ftp_pass1')
      .then((res: any) => {
        console.log("FTP 2");
        console.log('Login successful', res);
        this.fTP.ls("/").then((files) =>{
          for(let file of files){
            console.log(file.name);
          }



          var img = new Image();
          img.src = message;
          img.addEventListener('load', function () {

          });



        }, (err) => {

        });

      }

      )
      .catch((error: any) => console.error(error));


  }*/

  takeAPicture() {

    this.trigger().then((myBase64: string) => {

      this.createFile(myBase64);

      /*var img = new Image();
      img.src = myBase64;
      img.addEventListener('load', function () {
        console.log("-------------------------------------");
        console.log("Size H: " + img.height.toString());
      });*/



    }, (err) => {
      console.error("takeAPicture(): ", err);
    });

  }

  trigger() {
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
  }

}
