import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams ,Content } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Storage } from '@ionic/storage';
import { AuthenticatorProvider } from '../../providers/authenticator/authenticator';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

import { ListPage } from '../../pages/list/list';
import { LoaderComponent } from '../../components/loader/loader';

@Component({
  selector: 'page-list',
  templateUrl: 'detail.html'
})

export class DetailPage {
  @ViewChild(Content) content: Content;
  error;
  courseAdded = false;
  selectedItem: any;
  checked:boolean = false;
  stepNumber:number = 0;
  questionNumber:number = 0;
  reading:boolean = false;
  courseInArray;

  courseDoneAttr = { title: 'Courses', component: ListPage };

  constructor(
    private AuthenticatorProvider:AuthenticatorProvider,
    public loader:LoaderComponent , 
    private navCtrl: NavController, 
    private navParams: NavParams,
    private sanitizer: DomSanitizer, 
    private tts: TextToSpeech,
    private storage: Storage,
    private httpService: HttpServiceProvider) {
    // If we navigated to this page, we will have an item available as a nav param

     
    this.selectedItem = navParams.get('item');

    if (AuthenticatorProvider.user) {
      var i = 0;
       var found = AuthenticatorProvider.user["courses"].find(function(element) {
        if (element.id === navParams.get('item').id) {
          return element;
        }
        i++;
      });

      if (found) {
        console.log(AuthenticatorProvider.user["courses"][i]);
        this.courseInArray = i;
        this.stepNumber=AuthenticatorProvider.user["courses"][i].stepCurrent;
        this.questionNumber=AuthenticatorProvider.user["courses"][i].questionNumber;
        this.courseAdded = true;
        this.selectedItem = found;
      }
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

  transformUrl(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  onScroll(event) {
    let opacity = event.scrollTop / 154;
    let element = document.getElementById('ion-navbar-detail').childNodes[0];
    let opacityImage = document.getElementById('opacity-change-details');
    if (element["style"]) {

      if (event.scrollTop <= 154 ) {  
        opacityImage["style"].backgroundColor = "rgba(0,0,0,"+opacity+")";
      } 

      if (event.scrollTop > 154 ) {
        opacityImage["style"].backgroundColor = "rgba(0,0,0,1)";   
      } 
      
      if (event.scrollTop < 115 ) {
        element["style"].backgroundColor = "rgba(0,0,0,0)";
      }
      
      if (event.scrollTop >= 115 ) {
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
    
    if (this.AuthenticatorProvider.user) {
           console.log(this.AuthenticatorProvider.user["courses"][this.courseInArray]); this.selectedItem["questionNumber"] ++;
    }
    

  }

  prevQuestion() {
    this.checked = false;
    this.questionNumber--;
    
    if (this.AuthenticatorProvider.user) {
           console.log(this.AuthenticatorProvider.user["courses"][this.courseInArray]); this.selectedItem["questionNumber"] --;
    }
    

  }

  nextStep() {
    this.checked = false;
    this.stepNumber++;
    this.questionNumber = 0;
    
    if (this.AuthenticatorProvider.user) {
      this.selectedItem["stepCurrent"] ++;
      this.selectedItem["questionNumber"] = 0;
      console.log(this.AuthenticatorProvider.user["courses"][this.courseInArray]);   
    }
    this.content.scrollToTop(2000);
  }

  prevStep() {
    this.checked = false;
    this.stepNumber++;
    this.questionNumber = 0;
    
    if (this.AuthenticatorProvider.user) {
      this.selectedItem["stepCurrent"] ++;
      this.selectedItem["questionNumber"] = 0;
      console.log(this.AuthenticatorProvider.user["courses"][this.courseInArray]);   
    }
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
    this.tts.speak( {
      text: this.selectedItem.steps[this.stepNumber].read,
      locale: 'es-ES',
      rate: 0.85
    })
    .then(() => {
      this.reading = false;
    })
    .catch((reason: any) => {
      this.error = reason;
      console.log(reason)
    });
    this.reading = true;
  }

  stopReading() { 
    
    this.tts.speak({text: ''})
    .then(() => {
    })
    .catch((reason: any) => {
      this.error = reason;
      console.log(reason)
    });
    this.reading = false;
    
  }

  addToMyCourses() {
    if (this.AuthenticatorProvider.user) {
      this.loader.loading = true;
      this.selectedItem.stepCurrent = 0;
      this.selectedItem.questionNumber = 0;
      let courses = this.AuthenticatorProvider.user["courses"]
      courses.push(this.selectedItem);

      this.httpService.userUpdateCurses({_id:this.AuthenticatorProvider.user["_id"],courses:courses})
        .subscribe(
          data => {
              if (data["status"] === "success") {
                this.courseAdded = true;
                this.AuthenticatorProvider.user["courses"] = courses;
                this.courseInArray = this.AuthenticatorProvider.user["courses"].length - 1;
                this.storage.set('user', this.AuthenticatorProvider.user);
              } else {
                
              }
              
              setTimeout(()=>{
                this.loader.loading = false;
              },1000);
              console.log(data);
          },
          error => {     
            console.log(error);
          });
    }
  }

  save() {
    if (this.AuthenticatorProvider.user) {
      this.loader.loading = true;
      // this.AuthenticatorProvider.user["courses"][this.courseInArray] = this.selectedItem;
      this.httpService.userUpdateCurses({_id:this.AuthenticatorProvider.user["_id"] ,courses:this.AuthenticatorProvider.user["courses"]})
        .subscribe(
          data => {
              this.courseAdded = true;
              
              setTimeout(()=>{
                this.loader.loading = false;
              },1000);
              console.log(data);
          },
          error => {     
            console.log(error);
          });
    }
  }
}
