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
  items: Array<{
                id:  String,
                name: String,
                steps: Number,
                questions:[{
                  step: Number,
                  question: String,
                  answers: [{
                    number : Number,
                    answer: String,
                    correct: Boolean
                  }]
                }],
                media: [{
                  name: String,
                  url: String
                }],
                level: String,
                tags: [String]
            }>;

  constructor(public loader:LoaderComponent , public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServiceProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.pageInfo = navParams.get('page');

    if (this.pageInfo.title === "Courses") {
      httpService.getCourses()
      .subscribe(
        data => {
            // console.log(data["data"]);  
            this.items =  data["data"];  
        },
        error => {
            
            if (error.error == "Username or password is incorrect") {
            }
        });
    
    } else {
      httpService.getCourses()
      .subscribe(
        data => {
            console.log(data["data"]);  
            this.items =  data["data"];  
        },
        error => {
            
            if (error.error == "Username or password is incorrect") {
            }
        });
    }
  }

  // ngOnInit() {
  //   this.loader.loading = false;
  // }

  ionViewDidLoad() {
    setTimeout(()=>{
      this.loader.loading = false;
    },1000);
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.loader.loading = true;

    this.navCtrl.push(DetailPage, {
      item: item
    },{animate: false});
  }

}
