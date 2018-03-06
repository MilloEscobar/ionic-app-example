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
  }

  register(user) {
  	// return this.http.post("http://macrobible.fr.openode.io/register", user, {withCredentials: true});
  	return this.http.post("http://localhost:3000/register", user, {withCredentials: true});
  }

  login(user) {
    // return this.http.post("http://macrobible.fr.openode.io/login", user, {withCredentials: true});
    return this.http.post("http://localhost:3000/login", user, {withCredentials: true});
  }

  loggout() {
    // return this.http.get("http://macrobible.fr.openode.io/logout",{withCredentials: true});
    return this.http.get("http://localhost:3000/logout",{withCredentials: true});
  }

}
