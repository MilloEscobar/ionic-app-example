import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthenticatorProvider } from '../../providers/authenticator/authenticator';

import { LoaderComponent } from '../../components/loader/loader';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


 // <{
 //      name: String,
 //      lastName: String,
 //      username: String,
 //      salt: String,
 //      password: String,
 //      roles: [String],
 //      courses: [{
 //        id: String,
 //        step: Number,
 //        answers:[{
 //          step: Number,
 //          answers: Number
 //        }]
 //      }],

 //  }>

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(private AuthenticatorProvider:AuthenticatorProvider, public loader: LoaderComponent, public navCtrl: NavController, public navParams: NavParams) {
  }
  username;
  password;
  confirmPassword;

	// ngOnInit() {
	// 	this.loader.loading = false;
	// }

  ionViewDidLoad() {
    setTimeout(()=>{
      this.loader.loading = false;
    },1000);
  }

  register(form) {

    if (true) {
      console.log(form);
    }
    // this.loader.loading = true;
    // this.AuthenticatorProvider.logged = true;
    // setTimeout(()=>{
    //   this.navCtrl.setRoot(HomePage, {
    //     logged: true
    //   });
    // },1000);
  }

}
