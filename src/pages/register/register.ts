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


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(
    private AuthenticatorProvider:AuthenticatorProvider, 
    public loader: LoaderComponent, 
    public navCtrl: NavController, 
    public navParams: NavParams) {

    this.errorMessage = null;
  }
  errorMessage;
  registerForm = {
                  name: { value:"", valid:false, errorMessage:null },
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

  scorePassword(pass) {
    var score = 0;
    if (!pass)
        return false;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    let variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    if (score > 30) {
      return true;
    } else {
      return false;
    } 
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  nameValidate() {
    if (this.registerForm.name.value === "") {
      this.registerForm.name.valid = false;
      this.registerForm.name.errorMessage = "This field is Required";
    } else {
      this.registerForm.name.valid = true;
      this.registerForm.name.errorMessage = "";    
    } 
  }

  usernameValidate() {
    if (this.registerForm.username.value === "") {
      this.registerForm.username.valid = false;
      this.registerForm.username.errorMessage = "This field is Required";
    } else {
      this.registerForm.username.valid = this.validateEmail(this.registerForm.username.value);
      if (this.registerForm.username.valid) {
        this.registerForm.username.errorMessage = "";
      } else {
        this.registerForm.username.errorMessage = "Invalid Email";
      }    
    } 
  }

  passwordValidate() {
    if (this.registerForm.password.value === "") {
      this.registerForm.password.valid = false;
      this.registerForm.password.errorMessage = "This field is Required";
    } else {
      this.registerForm.password.valid = this.scorePassword(this.registerForm.password.value);
      if (this.registerForm.password.valid) {
        this.registerForm.password.errorMessage = "";
      } else {
        this.registerForm.password.errorMessage = "Weak Password";
      }
      
    }
    this.confirmPasswordValidate();
  }

  confirmPasswordValidate() {
    if (this.registerForm.password.value === this.registerForm.confirmPassword.value && this.registerForm.password.value != "") {
      this.registerForm.confirmPassword.valid = true;
      this.registerForm.confirmPassword.errorMessage = "";
    } else {
      this.registerForm.confirmPassword.valid = false;
      this.registerForm.confirmPassword.errorMessage = "Doesn't match the password";
    }
  }

  register() {

    if (this.registerForm.name.valid && this.registerForm.username.valid && this.registerForm.password.valid && this.registerForm.confirmPassword.valid) {

      let user = {
                  name: this.registerForm.name.value,
                  username: this.registerForm.username.value,
                  password: this.registerForm.password.value,
                  confirmPassword: this.registerForm.confirmPassword.value,
                  roles: ["user"],
                  courses: [],
                };
      this.loader.loading = true;

      this.AuthenticatorProvider.register(user)
        .subscribe(
        data => {
            if (data["data"]) {
              this.AuthenticatorProvider.logged = true;
              this.AuthenticatorProvider.user = data["data"];
              this.registerForm = {
                  name: { value:"", valid:false, errorMessage:null },
                  username: { value:"", valid:false, errorMessage:null }, 
                  password: { value:"", valid:false, errorMessage:null }, 
                  confirmPassword: { value:"", valid:false, errorMessage:null }
                };
              this.navCtrl.setRoot(HomePage, {animate: false});
            } else {
              this.loader.loading = false;
              this.errorMessage = "Something went wrong, please try again later";
            }
        },
        error => {
            this.loader.loading = false;
        });
    }
    
  }

  cancel() {
    this.loader.loading = true;
    this.navCtrl.setRoot(HomePage, {animate: false});
  }

}
