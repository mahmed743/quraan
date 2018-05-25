import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuClose, Events } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import { langDir } from '../settings/settings';
import { ConfigProvider } from '../../providers/config/config';
import { partsNames } from '../index';
import { AppnotificatiosProvider } from '../../providers/appnotificatios/appnotificatios';



@IonicPage()
@Component({
  selector: 'page-recitalmenu',
  templateUrl: 'recitalmenu.html',
})
export class RecitalmenuPage {
  appLang: string = 'ar';
  menuPages: any[];
  rootPage: string = 'RecitalPage';
  quranparts: any[] = [];
  juzNumber: any = '0';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public menuClose: MenuClose,
    public translateService: TranslateService,
    public configProvider: ConfigProvider,
    public events: Events,
    public appLocalNotification: AppnotificatiosProvider
  ) {

    this.platform.ready()
      .then(() => {
        this.appLocalNotification.localNotification.on('click')
          .subscribe(d => {
            if (d && d.page) {
              this.rootPage = d.page;
            }
          })
      })
  }

  ionViewDidLoad() {

    this.appLang = this.translateService.currentLang;

    this.quranparts = this.configProvider.JuzPageNumbers
      .map((part: any[]) => { part[2] = partsNames[part[0]];return part})  ;
    
    this.menuPages = [
      {
        index: 0,
        component: 'SalahtimesPage',
        icon: 'مواعيد الصلاة',
        title: 'مواعيد الصلاة'
      }, {
        index: 3,
        component: 'RecitalPage',// 'RecitalPage',
        icon: 'تلاوة',
        title: 'التلاوة'
      }, {
        index: 5,
        component: 'ExplainPage',
        icon: 'تفسير',
        title: 'التفسير'
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
      }, 

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
        index: 4,
        component: 'SealdoaaPage',
        icon: 'دعاء الختم',
        title: 'دعاء الختم'
      }, {
        index: 6,
        component: 'SettingsPage',
        icon: 'الاعدادات',
        title: 'الاعدادات'
      }
    ];
    this.scheduleNotifications();
  }

  scheduleNotifications() {
    this.appLocalNotification.localNotification.schedule(
      {
        text: 'تذكير بقراءة الورد اليومى',
        trigger: { at: new Date(new Date().getTime() + 30000) },
        led: 'FF0000',
        sound: this.platform.is('android')? 'file://sound.mp3': 'file://beep.caf',
        data: { page: 'DailyreadPage' }
      }
    );
  }

  changePageBy(navData, type: 'juz' | 'surah') {
    this.juzNumber = navData;
    this.events.publish('change:pageByJuz', navData);
    console.log(type, navData, this.juzNumber);
    this.menuClose.close();
  }
  public navTo(page: string, params: any = {}): void {
    this.events.publish('navmenu:changed');
    if (page === 'RecitalPage' || page === 'ExplainPage') {
      this.rootPage = page;
      //this.menuCtrl.close();
      this.menuClose.close();
    } else {
      this.navCtrl.push(page, { ...params, lang: langDir[this.platform.dir()] })
    }
  }

}
