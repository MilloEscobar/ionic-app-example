import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ComponentsModule } from '../components/components.module';

import { LoaderComponent } from '../components/loader/loader';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DetailPage } from '../pages/detail/detail';
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticatorProvider } from '../providers/authenticator/authenticator';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetailPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DetailPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    LoaderComponent,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticatorProvider
  ]
})
export class AppModule {}
