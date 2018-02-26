import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';

import { ComponentsModule } from '../components/components.module';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';

import { LoaderComponent } from '../components/loader/loader';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DetailPage } from '../pages/detail/detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticatorProvider } from '../providers/authenticator/authenticator';
import { HttpServiceProvider } from '../providers/http-service/http-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetailPage,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    RegisterPageModule,
    LoginPageModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DetailPage,
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    LoaderComponent,
    TextToSpeech,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticatorProvider,
    HttpServiceProvider
  ]
})
export class AppModule {}
