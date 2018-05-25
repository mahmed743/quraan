import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';


@IonicPage()
@Component({
  selector: 'page-upreference',
  templateUrl: 'upreference.html',
})
export class UpreferencePage {
  appLang: string = 'ar';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public configProvider: ConfigProvider
  ) {
    this.appLang = this.navParams.get('appLang');
  }

  ionViewDidLoad() {
    
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
