import { Component, ViewChild, Inject } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  index?: number;
  tabName?: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  pages: PageInterface[] = [
    { title: 'Profile', name: 'ProfilePage', component: ProfilePage, index: 0, icon: 'home' },
  ];
  @ViewChild(Nav) nav: Nav;
  
  //TODO evtl. auf Login ändern
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
    });
  }

  openProfile(page: PageInterface) {
    let params = {};
 
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {

      this.nav.push(page.component, params);
    }
  }

}

