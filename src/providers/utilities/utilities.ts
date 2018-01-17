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

  // Zeigt einen Anmeldeprozess grafisch dar. (Wartezeit)
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...',
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  // Schließt den grafischen Anmeldeprozess.
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
    //this.authProvider.setToken(session);
  }

}
