import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

/*
  Generated class for the SmartAudioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
 
@Injectable()
export class SmartAudio {
 
  audioType: string = 'html5';
  sounds: any = [];
  run: boolean = false;
 
  constructor(public nativeAudio: NativeAudio, platform: Platform) {
 
    if(platform.is('cordova')){
      this.audioType = 'native';
    }
 
  }
 
  preload(key, asset) {
 
    if(this.audioType === 'html5'){
 
      let audio = {
        key: key,
        asset: asset,
        type: 'html5'
      };
 
      this.sounds.push(audio);
 
    } else {
 
      this.nativeAudio.preloadComplex(key, asset,1,1,0);
 
      let audio = {
        key: key,
        asset: key,
        type: 'native'
      };
 
      this.sounds.push(audio);
    }      
 
  }
 
  play(key){
    let audio = this.sounds.find((sound) => {
    return sound.key === key;
    });
 
    if(audio.type === 'html5'){
 
      let audioAsset = new Audio(audio.asset);

      if(this.run == false) {
        audioAsset.play();
        

      } else if (this.run = true) {
        audioAsset.pause();
        audioAsset.currentTime = 0.0;
        this.nativeAudio.unload(key);
 
        

      }

    } else {
 
      if(this.run == false) {
        this.nativeAudio.play(audio.asset).then((res) => {
        console.log(res);
        }, (err) => {
            console.log(err);
        });

      } else {
        this.nativeAudio.stop(audio.asset);

      }

    }
 
  }

  unload(key) {
    let audio = this.sounds.find((sound) => {
      return sound.key === key;
      });  
    this.nativeAudio.unload(key);
    }
  




}