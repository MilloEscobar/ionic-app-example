import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthenticatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticatorProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthenticatorProvider Provider');
  }

}
