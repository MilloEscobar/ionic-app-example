import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthenticatorProvider } from '../../providers/authenticator/authenticator';

import { LoaderComponent } from '../../components/loader/loader';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


	constructor(private AuthenticatorProvider:AuthenticatorProvider, public loader: LoaderComponent, public navCtrl: NavController, public navParams: NavParams){
	}

	// ngOnInit() {
	// 	this.loader.loading = false;
	// }

  ionViewDidLoad() {
    this.loader.loading = false;
  }

  login() {
    this.loader.loading = true;
    this.AuthenticatorProvider.logged = true;
    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.navCtrl.setRoot(HomePage, {
        logged: true
      });
    },2000);
  }
}
