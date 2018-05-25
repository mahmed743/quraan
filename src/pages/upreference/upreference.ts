import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-upreference',
  templateUrl: 'upreference.html',
})
export class UpreferencePage {
  appLang: string = 'ar';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.appLang = this.navParams.get('appLang');
  }

  ionViewDidLoad() {
    
  }

  choosePart(partNumber) {
    // save user choose

    this.navCtrl.setRoot('RecitalmenuPage')
  }
}
