import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';
import { LoaderComponent } from '../../components/loader/loader';
import { HttpServiceProvider } from '../../providers/http-service/http-service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  pageInfo: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public loader:LoaderComponent , public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServiceProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.pageInfo = navParams.get('page');

    if (this.pageInfo.title === "Courses") {
      this.items = httpService.getCourses()
      // .subscribe(
      //   data => {
      //       this.router.navigate(['/main']);           
      //   },
      //   error => {
            
      //       if (error.error == "Username or password is incorrect") {
      //         this.alertMessage = {
      //           message: "Username or password is incorrect",
      //           type: "danger",
      //         }
      //       }
      //   });
    
    } else {
      this.items = httpService.getMyCourses()
      // .subscribe(
      //   data => {
      //       this.router.navigate(['/main']);           
      //   },
      //   error => {
            
      //       if (error.error == "Username or password is incorrect") {
      //         this.alertMessage = {
      //           message: "Username or password is incorrect",
      //           type: "danger",
      //         }
      //       }
      //   });
    }
  }

  // ngOnInit() {
  //   this.loader.loading = false;
  // }

  ionViewDidLoad() {
    this.loader.loading = false;
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.loader.loading = true;
    
    setTimeout(()=>{
      this.navCtrl.push(DetailPage, {
        item: item
      });
    }, 1000);
  }

}
