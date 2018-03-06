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
  serviceLink = "macrobible.fr.openode.io";
  // serviceLink = "localhost:3000";

  constructor(public http: HttpClient) {
  }

  register(user) {
  	return this.http.post("http://"+this.serviceLink+"/register", user, {withCredentials: true});
  }

  login(user) {
    return this.http.post("http://"+this.serviceLink+"/login", user, {withCredentials: true});
  }

  loggout() {
    return this.http.get("http://"+this.serviceLink+"/logout",{withCredentials: true});
  }

}
