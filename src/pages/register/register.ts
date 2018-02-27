import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { FormControl, FormGroup } from '@angular/forms';

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

  errorMessage:string = null;

  registerForm = {
                    username: { value:"", valid:false, errorMessage:null }, 
                    password: { value:"", valid:false, errorMessage:null }, 
                    confirmPassword: { value:"", valid:false, errorMessage:null }
                  };
  

	// ngOnInit() {
	// 	this.loader.loading = false;
	// }

  ionViewDidLoad() {
    setTimeout(()=> {
      this.loader.loading = false;
    },1000);
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  register() {
    if (this.registerForm.username.value) {
      if (this.validateEmail(this.registerForm.username.value)) {
        console.log("Valid email: ", this.validateEmail(this.registerForm.username.value));
      }
      if (this.registerForm.password === this.registerForm.confirmPassword) {
        // code...
      }
      console.log("success: " , this.registerForm.username , this.registerForm.password, this.registerForm.confirmPassword);
    } else {
      console.log("error: " , this.registerForm.username , this.registerForm.password, this.registerForm.confirmPassword);
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
