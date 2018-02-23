import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { LoaderComponent } from '../../components/loader/loader';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pageInfo: any;
  urlImage;
	urlFixed;
	url = "https://www.youtube.com/embed/fKopy74weus?"+"&theme=dark&color=white&autohide=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3";

	constructor(public navParams: NavParams, public loader:LoaderComponent , public navCtrl: NavController, private sanitizer: DomSanitizer, private camera: Camera) {
		
    
    if (navParams.get('page')) {
      this.pageInfo = navParams.get('page');
      console.log(this.pageInfo);
    } else {
      this.pageInfo = { title: 'Micro Bible', component: HomePage };
    }
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
    if (element["style"]) {
      if (event.scrollTop <= 154 ) {
        let backgroundColor = event.scrollTop / 154;
        element["style"].backgroundColor = "rgba(0,0,0,"+ backgroundColor+")";
      } if (event.scrollTop > 154 ) {
        element["style"].backgroundColor = "rgba(0,0,0,1)";
      } 
    }
  }

	ngOnInit() {
    this.urlImage = this.transformUrl("https://camo.githubusercontent.com/e9c5fe6cb160f55f564723b8c1679170c74f5e53/687474703a2f2f73392e706f7374696d672e6f72672f7a336e707077797a332f73686565705f333530782e6a7067");
  	}

  	transformUrl(url){
  		return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  	}

  ionViewDidLoad() {
    this.loader.loading = false;
  }

}
