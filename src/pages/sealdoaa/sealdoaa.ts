import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sealdoaa',
  templateUrl: 'sealdoaa.html',
})
export class SealdoaaPage {
  appLang:string
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.appLang = this.navParams.get('lang');
  }

}
