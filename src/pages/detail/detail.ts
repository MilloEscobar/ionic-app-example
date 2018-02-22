import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

import { LoaderComponent } from '../../components/loader/loader';

@Component({
  selector: 'page-list',
  templateUrl: 'detail.html'
})

export class DetailPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  stepNumber:number = 0;
  questionAnswer;
  questionNumber:number = 0;


  constructor(public loader:LoaderComponent , public navCtrl: NavController, public navParams: NavParams,private sanitizer: DomSanitizer) {
    // If we navigated to this page, we will have an item available as a nav param
    
    this.selectedItem = navParams.get('item');
  }
  // ngOnInit() {
  //   this.loader.loading = false;
  // }

  ionViewDidLoad() {
    this.loader.loading = false;
  }

  transformUrl(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  nextStep() {
    this.stepNumber++;
    this.questionNumber = 0;
  }

  prevStep() {
    this.stepNumber++;
    this.questionNumber = 0;
  }

  nextQuestion() {
    this.questionNumber++;
  }

  prevQuestion() {
    this.questionNumber--;
  }

}
