import { Component } from '@angular/core';
import { NavController, NavParams , AlertController} from 'ionic-angular';

import { AuthenticatorProvider } from '../../providers/authenticator/authenticator';

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

  constructor(
    public loader:LoaderComponent , 
    private AuthenticatorProvider:AuthenticatorProvider,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController,
    public httpService: HttpServiceProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.pageInfo = navParams.get('page');

    if (this.pageInfo.title === "Courses") {
      httpService.getCourses()
      .subscribe(
        data => {
            // console.log(data["data"]);
            if (data["status"] == "error") {
              return this.presentAlert(data["message"]);
            }
            this.items =  data["data"];  
        },
        error => {
            
            if (error.error == "Username or password is incorrect") {
              this.presentAlert(error);
            }
        });
    
    } else {
      httpService.getCourses()
      this.items = AuthenticatorProvider.user['courses'];
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

  presentAlert(msj) {
    let alert = this.alertCtrl.create({
      title: 'Algo salio mal',
      subTitle: msj,
      buttons: ['Ok']
    });
    alert.present();
  }

}
