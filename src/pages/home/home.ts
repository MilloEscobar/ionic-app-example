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
	url = "https://www.youtube.com/embed/fKopy74weus?"+"&theme=dark&color=white&autohide=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3";

	constructor(public navParams: NavParams, public loader:LoaderComponent , public navCtrl: NavController, private sanitizer: DomSanitizer, private camera: Camera) {
		
    
    if (navParams.get('page')) {
      this.pageInfo = navParams.get('page');
      console.log(this.pageInfo);
    } else {
      this.pageInfo = { title: 'App Name', component: HomePage };
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

}
