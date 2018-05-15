import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
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
  constructor(public navCtrl: NavController, public localNotification: LocalNotifications) {

  }
  ionViewDidLoad() {
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
      }
    ];

    this.scheduleNotifications();
  }

  public navTo(page:string, params:any={}):void {
    this.navCtrl.push(page, params)
  }

  scheduleNotifications() {
    this.localNotification.schedule(
      {
        text: 'Delayed ILocalNotification',
        trigger: {at: new Date(new Date().getTime() + 3600)},
        led: 'FF0000',
        sound: null
     }
    )
  }

}
