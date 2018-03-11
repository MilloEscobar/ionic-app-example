import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { LoaderComponent } from '../components/loader/loader';

import { AuthenticatorProvider } from '../providers/authenticator/authenticator';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  myPages: Array<{title: string, component: any}>;

  constructor(
    private AuthenticatorProvider: AuthenticatorProvider, 
    public loader:LoaderComponent ,
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private storage: Storage) {

    this.initializeApp();
    

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'App Name', component: HomePage },
      { title: 'Courses', component: ListPage }
    ];

    this.myPages = [
      { title: 'My Courses', component: ListPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(true);
      this.statusBar.styleDefault();
      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.loader.loading = true;
    
    this.nav.setRoot(page.component, {
      page:page
    },{animate: false});
    
  }

  login() {
    this.loader.loading = true;
    
    this.nav.push(LoginPage, {
      logged: false
    },{animate: false});
  }
  register() {
    this.loader.loading = true;
    
    this.nav.push(RegisterPage, {
      logged: false
    },{animate: false});
  }
  
  logout() {
    this.loader.loading = true;
    this.AuthenticatorProvider.loggout()
    .subscribe(
      data => {
        this.storage.remove('user');
        this.AuthenticatorProvider.user = null; 
        this.AuthenticatorProvider.logged = false;
        this.nav.setRoot(HomePage, {
        },{animate: false});
      },
      error => { 
          
      });
  }
}
