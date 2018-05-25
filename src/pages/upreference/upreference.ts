import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import {ArPartsNumber} from "../../providers/werd/werd";


@IonicPage()
@Component({
  selector: 'page-upreference',
  templateUrl: 'upreference.html',
})
export class UpreferencePage {
  appLang: string = 'ar';
  parts:{name: string, value: number}[] = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public configProvider: ConfigProvider
  ) {
    this.appLang = this.navParams.get('appLang');
  }

  ionViewDidLoad() {

    this.parts = Array.from({length:4}, (iter, index)=>({name:ArPartsNumber[index+1], value: index+1}));
    console.log('user parts', this.parts);

  }

  choosePart(partNumber) {
    // save user choose
    this.configProvider.setPreferences('partsNumber', partNumber)
      .then(pref => {
        console.info('user saved preferences', pref);
      })
    this.navCtrl.setRoot('RecitalmenuPage')
  }
}
