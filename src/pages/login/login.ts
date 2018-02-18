import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoaderComponent } from '../../components/loader/loader';

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


	constructor(public loader: LoaderComponent, public navCtrl: NavController, public navParams: NavParams){
	}

	// ngOnInit() {
	// 	this.loader.loading = false;
	// }

  ionViewDidLoad() {
    this.loader.loading = false;
  }

}
