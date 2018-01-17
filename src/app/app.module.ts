import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

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
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { VideoPlayer } from '@ionic-native/video-player';
import { FileTransfer} from '@ionic-native/file-transfer';
import { UtilitiesProvider } from '../providers/utilities/utilities';
import { StorageProvider } from '../providers/storage/storage';
import { MediaProvider } from '../providers/media/media';

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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    Camera,
    File,
    VideoPlayer,
    FileTransfer,
    UtilitiesProvider,
    StorageProvider,
    MediaProvider
  ]
})
export class AppModule {

  
}

