import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

import { SessionModel } from '../../app/models/SessionModel';

@Injectable()
export class UtilitiesProvider {

  private loading: any;

  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider) {
  }

  // Ändert den Statustext des grafischen Prozesses.
  setLoaderContent(text: string){
    this.loading.setContent(text);
  }

  // Zeigt einen Prozess grafisch dar. (Wartezeit)
  showLoader(text: string) {
    this.loading = this.loadingCtrl.create({
      content: text,
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  // Schließt den grafischen Prozess.
  closeLoader() {
    this.loading.dismiss();
  }

  // Ruft eine Dialogbox mit einem Hinweistext auf.
  giveAlert(titel: string, text: string) {
    let alert = this.alertCtrl.create({
      title: titel,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  // Loggt den User vom Server aus und überschreibt die gespeicherte SessionID.
  logout() {
    // Session überschreiben.
    let session: SessionModel = new SessionModel("EMPTY", "logout");
    this.authProvider.setToken(session);
  }

}
