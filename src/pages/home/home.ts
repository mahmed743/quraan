import { Component } from '@angular/core';
import {IonicPage, NavController, Platform} from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TranslateService } from '@ngx-translate/core';
import { langDir } from '../settings/settings';
import {Brightness} from "@ionic-native/brightness";
interface Page {
  index: number,
  title: string,
  component: string,
  icon: string
}

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  homePages:Page[];
  appLang:string;
  brightness = 0;
  constructor(public navCtrl: NavController,
    public localNotification: LocalNotifications,
    public screenOrientation: ScreenOrientation,
    public platform: Platform,
    public translate: TranslateService,
              public brightnessNative: Brightness
  ) {

  }
  async ionViewDidLoad() {

    if (this.platform.is('cordova')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
    this.appLang = this.translate.currentLang;

    this.homePages = [
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
      },{
        index: 2,
        component: 'DailyreadPage',
        icon: 'الورد اليومي',
        title: 'الورد اليومى'
      },{
        index:3,
        component: 'RecitalmenuPage',// 'RecitalPage',
        icon: 'تلاوة',
        title: 'التلاوة'
      },{
        index: 4,
        component: 'SealdoaaPage',
        icon: 'دعاء الختم',
        title: 'دعاء الختم'
      },{
        index: 5,
        component: 'ExplainPage',
        icon: 'تفسير',
        title: 'التفسير'
      },{
        index: 6,
        component: 'SettingsPage',
        icon: 'الاعدادات',
        title: 'الاعدادات'
      },{
        index: 7,
        component: 'SearchPage',
        icon: 'البحث',
        title: 'البحث'
      }, {
        index: 8,
        component: 'AzkarofdayPage',
        icon: 'البحث',
        title: 'azkar'
      }
    ];

  }

  public navTo(page:string, params:any={}):void {
    console.log('home app lang', this.appLang, this.platform.dir());
    this.navCtrl.push(page, {...params, lang:langDir[this.platform.dir()]})
  }

 


  brightChange(event: any) {
    console.log(event);
    this.brightnessNative.setBrightness(event/10)
  }
}
