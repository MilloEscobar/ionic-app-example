import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams ,Content } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

import { TextToSpeech } from '@ionic-native/text-to-speech';

import { ListPage } from '../../pages/list/list';
import { LoaderComponent } from '../../components/loader/loader';

@Component({
  selector: 'page-list',
  templateUrl: 'detail.html'
})

export class DetailPage {
  @ViewChild(Content) content: Content;

  selectedItem: any;
  checked:boolean = false;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  stepNumber:number = 0;
  questionAnswer;
  questionNumber:number = 0;
  reading:boolean=false;

  courseDoneAttr = { title: 'Courses', component: ListPage };


  constructor(public loader:LoaderComponent , public navCtrl: NavController, public navParams: NavParams,private sanitizer: DomSanitizer, private tts: TextToSpeech) {
    // If we navigated to this page, we will have an item available as a nav param
    
    this.selectedItem = navParams.get('item');
  }
  // ngOnInit() {
  //   this.loader.loading = false;
  // }

  ionViewDidLoad() {
    setTimeout(()=>{
      this.loader.loading = false;
    },1000);
  }

  transformUrl(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  onScroll(event) {
    
    let element = document.getElementById('ion-navbar-detail').childNodes[0];
    if (element["style"]) {
      if (event.scrollTop <= 154 ) {
        let backgroundColor = event.scrollTop / 154;
        element["style"].backgroundColor = "rgba(0,0,0,"+ backgroundColor+")";
      } if (event.scrollTop > 154 ) {
        element["style"].backgroundColor = "rgba(0,0,0,1)";
      } 
    }
  }

  check() {
    this.checked = true;
  }

  nextQuestion() {
    this.checked = false;
    this.questionNumber++;
  }

  prevQuestion() {
    this.checked = false;
    this.questionNumber--;
  }

  nextStep() {
    this.checked = false;
    this.stepNumber++;
    this.questionNumber = 0;
    this.content.scrollToTop(2000);
  }

  prevStep() {
    this.checked = false;
    this.stepNumber++;
    this.questionNumber = 0;
    this.content.scrollToTop(2000);
  }

  courseDone() {
    this.checked = false;
    this.loader.loading = true;
    setTimeout(()=>{
      this.navCtrl.setRoot(this.courseDoneAttr.component , { page : this.courseDoneAttr });
    },1000);
    
  }

  readText() {
    this.reading = true;
    this.tts.speak(this.selectedItem.steps[this.stepNumber].info)
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }

  stopReading() { 
    this.reading = false;
    this.tts.stop()
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }
}
