import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LoaderComponent } from '../../components/loader/loader';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pageInfo: any;
  urlImage;
	url = "https://www.youtube.com/embed/fKopy74weus?"+"&theme=dark&color=white&autohide=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3";
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

	constructor(public httpService: HttpServiceProvider, public navParams: NavParams, public loader:LoaderComponent , public navCtrl: NavController, private sanitizer: DomSanitizer, private camera: Camera) {
		
    
    if (navParams.get('page')) {
      this.pageInfo = navParams.get('page');
      console.log(this.pageInfo);
    } else {
      this.pageInfo = { title: 'App Name', component: HomePage };
    }

    httpService.getLastCourses()
      .subscribe(
        data => {
            this.items =  data["data"];  
        },
        error => {
            
            if (error.error == "Username or password is incorrect") {
            }
        });
	}

  takePicture() {
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64:
   this.urlImage = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
   // Handle error
  });
  }

  onScroll(event) {
    let element = document.getElementById('ion-navbar').childNodes[0];
    let title = document.getElementById('title-transparent').childNodes[0];
    let opacityImage = document.getElementById('opacity-change');
    let opacity = event.scrollTop / 154;

    if (element["style"]) {
      if (event.scrollTop <= 154 ) {
        opacityImage["style"].opacity = "" + opacity;
      } 

      if (event.scrollTop > 154 ) {  
        opacityImage["style"].opacity = "1";
        
      } 

      if (event.scrollTop < 115 ) {
        element["style"].backgroundColor = "rgba(0,0,0,0)";
        title["style"].color = "rgba(255,255,255,0)";
      }
      
      if (event.scrollTop >= 115 ) {
        element["style"].backgroundColor = "rgba(0,0,0,1)";
        title["style"].color = "rgba(255,255,255,1)";
      }
    }
  }

	ngOnInit() {
    this.urlImage = "https://thenypost.files.wordpress.com/2017/05/shutterstock_115473676.jpg?quality=90&strip=all&strip=all";
  	}

  	transformUrl(url){
  		return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  	}

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
