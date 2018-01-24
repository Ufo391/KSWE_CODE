import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeAudio } from '@ionic-native/native-audio';
import { File } from '@ionic-native/file';

import { MyApp } from './app.component';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ModePage } from '../pages/mode/mode';
import { OptionsPage } from '../pages/options/options'; 
import { ArchivePage } from '../pages/archive/archive';
import { AuthProvider } from '../providers/auth/auth';
import { HttpModule } from '@angular/http';
import { ProfilePage } from '../pages/profile/profile';
import { SmartAudio } from '../providers/smart-audio/smart-audio';
import { NavigationProvider } from '../providers/navigation/navigation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ModePage,
    OptionsPage,
    ArchivePage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ModePage,
    OptionsPage,
    ArchivePage,
    ProfilePage
  ],
  providers: [
    NativeStorage,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    NativeAudio,
    SmartAudio,
    NavigationProvider,
    File
  ]
})
export class AppModule {

  
}

