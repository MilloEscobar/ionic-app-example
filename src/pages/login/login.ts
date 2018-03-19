import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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


	constructor(
    private AuthenticatorProvider:AuthenticatorProvider, 
    public loader: LoaderComponent, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private storage: Storage){
	}

	// ngOnInit() {
	// 	this.loader.loading = false;
	// }
  errorMessage;
  loginForm = {
                username: { value:"", valid:false, errorMessage:null }, 
                password: { value:"", valid:false, errorMessage:null }, 
              };

  ionViewDidLoad() {
    setTimeout(()=>{
      this.loader.loading = false;
    },1000);
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  usernameValidate() {
    if (this.loginForm.username.value === "") {
      this.loginForm.username.valid = false;
      this.loginForm.username.errorMessage = "This field is Required";
    } else {
      this.loginForm.username.valid = this.validateEmail(this.loginForm.username.value);
      if (this.loginForm.username.valid) {
        this.loginForm.username.errorMessage = "";
      } else {
        this.loginForm.username.errorMessage = "Invalid Email";
      }    
    } 
  }

  passwordValidate() {
    if (this.loginForm.password.value === "") {
      this.loginForm.password.valid = false;
      this.loginForm.password.errorMessage = "This field is Required";
    } else {
      this.loginForm.password.valid = true; 
    }
  }

  login() {

    if (this.loginForm.username.valid && this.loginForm.password.valid) {
      this.loader.loading = true;
      this.AuthenticatorProvider.login({
        username: this.loginForm.username.value,
        password: this.loginForm.password.value,
      })
      .subscribe(
      data => {
          if (data["data"]) {

            this.AuthenticatorProvider.logged = true;
            this.AuthenticatorProvider.user = data["data"];
            this.storage.set('user', data["data"]);
            this.navCtrl.setRoot(HomePage, {animate: false});
          } else {
            this.loader.loading = false;
            this.presentAlert(data['message']);
            this.errorMessage = data['message'];
          }
      },
      error => {
          this.loader.loading = false;
          this.errorMessage = "Something went wrong, please try again later";
          this.presentAlert(error);
          console.log(error);
      });

    }
  }

  cancel() {
    this.loader.loading = true;
    this.navCtrl.setRoot(HomePage, {animate: false});
  }

  presentAlert(msj) {
    let alert = this.alertCtrl.create({
      title: 'Algo salio mal',
      subTitle: msj,
      buttons: ['Ok']
    });
    alert.present();
  }

}
