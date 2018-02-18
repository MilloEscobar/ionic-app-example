import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';
import { LoaderComponent } from '../../components/loader/loader';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public loader:LoaderComponent , public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 0; i < 5; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[i]
      });
    }
  }

  // ngOnInit() {
  //   this.loader.loading = false;
  // }

  ionViewDidLoad() {
    this.loader.loading = false;
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }
}
