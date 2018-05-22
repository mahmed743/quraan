import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";



@IonicPage()
@Component({
  selector: 'page-recitalmenu',
  templateUrl: 'recitalmenu.html',
})
export class RecitalmenuPage {
  recitalPage:string = 'RecitalPage';
  appLang:string = 'ar';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public translateService: TranslateService) {
  }

  ionViewDidLoad() {
    this.appLang = this.translateService.currentLang;
    console.log('menu app lang', this.appLang)
  }

}
