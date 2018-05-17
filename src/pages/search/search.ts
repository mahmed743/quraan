import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  appLang: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.appLang = this.navParams.get('lang');
    console.log(this.navParams.data)
  }

  search() {

  }

  onSearchClear() {
    console.log('search cleared')
  }

}
