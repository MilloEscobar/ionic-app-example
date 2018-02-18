import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { LoaderComponent } from '../../components/loader/loader';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  urlImage;
	urlFixed;
	url = "https://www.youtube.com/embed/fKopy74weus?ecver=2";

	constructor(public loader:LoaderComponent , public navCtrl: NavController, private sanitizer: DomSanitizer, private camera: Camera) {
		
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
