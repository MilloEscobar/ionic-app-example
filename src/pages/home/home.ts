import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	urlFixed;
	url = "https://www.youtube.com/embed/fKopy74weus?ecver=2";

	constructor(public navCtrl: NavController, private sanitizer: DomSanitizer) {
		
	}
	ngOnInit() {
      this.urlFixed = this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
  	}

  	transformUrl(){
  		return this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
  	}

}
