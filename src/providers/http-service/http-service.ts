import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {
  serviceLink = "macrobible.fr.openode.io";
  // serviceLink = "localhost:3000";


	pageInfo: any;
	icons: string[] = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];;
	items: Array<{title: string, note: string, icon: string}>;
	myItems: Array<{title: string, note: string, icon: string}>;

  constructor(public http: HttpClient) {

  }
  //Courses
  getCourses () {
    return this.http.get("http://"+this.serviceLink+"/api/course");
  }

  getLastCourses () {
    return this.http.get("http://"+this.serviceLink+"/api/course/last/8");
  }

  getCourse ()  {

  }

  getMyCourses () {

  }

  getMyCourse (){

  }

  //user

  updateUser(user) {
    return this.http.put("http://"+this.serviceLink+"/users/userUpdate", user, {withCredentials: true});
  }

  userUpdateCurses(user) {
    return this.http.put("http://"+this.serviceLink+"/users/userUpdateCurses", user, {withCredentials: true});
  }
}
