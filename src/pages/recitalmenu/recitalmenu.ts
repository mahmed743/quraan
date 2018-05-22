import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import { langDir } from '../settings/settings';



@IonicPage()
@Component({
  selector: 'page-recitalmenu',
  templateUrl: 'recitalmenu.html',
})
export class RecitalmenuPage {
  appLang: string = 'ar';
  menuPages: any[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
              public platform: Platform,
              public translateService: TranslateService) {
  }

  ionViewDidLoad() {
    this.appLang = this.translateService.currentLang;
    console.log('menu app lang', this.appLang);
    this.menuPages = [
      {
        index: 0,
        component: 'SalahtimesPage',
        icon: 'مواعيد الصلاة',
        title: 'مواعيد الصلاة'
      },
      {
        index: 1,
        component: 'IndexPage',
        icon: 'فهرس',
        title: 'الفهرس'
      }, {
        index: 2,
        component: 'DailyreadPage',
        icon: 'الورد اليومي',
        title: 'الورد اليومى'
      }, {
        index: 3,
        component: 'RecitalmenuPage',// 'RecitalPage',
        icon: 'تلاوة',
        title: 'التلاوة'
      }, {
        index: 4,
        component: 'SealdoaaPage',
        icon: 'دعاء الختم',
        title: 'دعاء الختم'
      },
      /*{
        index: 5,
        component: 'ExplainPage',
        icon: 'تفسير',
        title: 'التفسير'
      },*/
       {
        index: 7,
        component: 'SearchPage',
        icon: 'البحث',
        title: 'البحث'
      }, {
        index: 8,
        component: 'AzkarofdayPage',
        icon: 'البحث',
        title: 'azkar'
      }, {
        index: 6,
        component: 'SettingsPage',
        icon: 'الاعدادات',
        title: 'الاعدادات'
      }
    ];
  }

  public navTo(page: string, params: any = {}): void {
    this.navCtrl.push(page, { ...params, lang: langDir[this.platform.dir()] })
  }

}
