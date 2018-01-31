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

/**
 * Die Klasse RatingPage kümmert sich um den Inhalt der Seite "Judge".
 */
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
    // Legt fest, wie der Stack der Cards definiert ist, z.B. ab wann wurde weit genug geswiped um eine Funktion auszulösen.
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
    // Legt den ersten Stapel an Cards an.
    this.addNewCards();
  }

  // Verbindet das DragEvent vom Stack mit der vorgegebenen Funktion.
  ngAfterViewInit() {
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
  }

  // Ändert die Hintergrundfarbe der Card beim Swipen.
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

  // Wertet ein abgegebenes Votum aus und lädt ggf. neue Elemente für den Stapel an Cards nach.
  vote(like: boolean) {
    this.removedVideo = this.videos.pop();


    if (this.videos.length < 1) {
      this.addNewCards();
    }

    if (like) {
      console.log("StarDuell: You liked: " + this.removedVideo);
      // TODO: Votum dem Server mitteilen.
    } else {
      console.log("StarDuell: You disliked: " + this.removedVideo);
      // TODO: Votum dem Server mitteilen.
    }
  }

  // Fügt dem Stack an Cards neue Videos hinzu.
  // Liest die Videos aud dem nativen Gerätespeicher aus und fügt für jedes Video eine Card hinzu.
  addNewCards() {

    // TODO: Video Urls vom Server bekommen und als Element hinzufügen.
    this.storage.getFileList("www/Video/").then((entries: string[]) => {
      entries.forEach(element => {
        // Liste aller Videos füllen.
        this.videos.push(element);
      });
    }, (err) => {
      console.error(JSON.stringify(err).toString())
    });

    this.actualVideo = this.videos[0];

  }

  // Rechnet den dezimalen Wert in Hexadezimal um.
  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }

  // Meldet den User ab und lässt ihn zur Startseite zurückkehren.
  logout() {
    this.utilities.logout();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

}
