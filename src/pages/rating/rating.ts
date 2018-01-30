import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';

import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { StorageProvider } from '../../providers/storage/storage';
import { MediaProvider } from '../../providers/media/media';

@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {
  @ViewChild('SwingElement') swingStack: SwingStackComponent;
  @ViewChildren('CardsDeck') swingCards: QueryList<SwingCardComponent>;

  videos: Array<string> = [];
  stackConfig: StackConfig;

  actualVideo = "";
  removedVideo = "";

  constructor(public navCtrl: NavController,
    public utilities: UtilitiesProvider,
    public storage: StorageProvider,
    public media: MediaProvider) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
    this.addNewCards();
  }

  ngAfterViewInit() {
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
  }

  // Changes the background color of the picture
  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    let hexCode = this.decimalToHex(min, 2);

    if (x > 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  // Gives a vote and calls a new Card via Http
  vote(like: boolean) {
    this.removedVideo = this.videos.pop();


    if (this.videos.length < 1) {
      this.addNewCards();
    }

    if (like) {
      console.log("StarDuell: You liked: " + this.removedVideo);
    } else {
      console.log("StarDuell: You disliked: " + this.removedVideo);
    }
  }

  // Add new card to our array
  addNewCards() {

    this.storage.getFileList("www/Video/").then((entries: string[]) => {
      entries.forEach(element => {
        // Liste aller Videos füllen
        this.videos.push(element);
      });
    }, (err) => {
      console.error(JSON.stringify(err).toString())
    });

    this.actualVideo = this.videos[0];

  }

  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }

  logout() {
    this.utilities.logout();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

}
