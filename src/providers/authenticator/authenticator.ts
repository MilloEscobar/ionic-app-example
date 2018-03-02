import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthenticatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticatorProvider {
	logged = false;
  user:any;

  constructor(public http: HttpClient) {
    console.log('Hello AuthenticatorProvider Provider');
  }

  register(user) {
  	// return this.http.post("http://macrobible.fr.openode.io/register", user);
  	return this.http.post("http://localhost:3000/register", user);
  }

  login(user) {
    // return this.http.post("http://macrobible.fr.openode.io/login", user);
    return this.http.post("http://localhost:3000/login", user);
  }

  loggout() {
    return this.http.get("http://192.168.0.115:3000/logout");
  }

}
