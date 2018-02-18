import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoaderComponent } from '../../components/loader/loader';

@Component({
  selector: 'page-list',
  templateUrl: 'detail.html'
})

export class DetailPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public loader:LoaderComponent , public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    
    this.selectedItem = navParams.get('item');
    console.log(navParams);
  }
  // ngOnInit() {
  //   this.loader.loading = false;
  // }

  ionViewDidLoad() {
    this.loader.loading = false;
  }
}
