import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {SealdoaaPage} from "../sealdoaa/sealdoaa";
import {RecitalPage} from "../recital/recital";
import {ExplainPage} from "../explain/explain";
import {RecitalmenuPage} from "../recitalmenu/recitalmenu";

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
  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    this.homePages = [
      {
        index: 0,
        component: 'IndexPage',
        icon: 'ios-clipboard-outline',
        title: 'الفهرس'
      },{
        index: 1,
        component: 'TagsPage',
        icon: 'pricetags',
        title: 'الفواصل'
      },{
        index:2,
        component: 'RecitalmenuPage',// 'RecitalPage',
        icon: 'md-volume-up',
        title: 'التلاوة'
      },{
        index: 3,
        component: 'ExplainPage',
        icon: 'leaf',
        title: 'التفسير'
      },{
        index: 4,
        component: 'SettingsPage',
        icon: 'settings',
        title: 'الاعدادات'
      },{
        index: 5,
        component: 'SearchPage',
        icon: 'search',
        title: 'البحث'
      },{
        index: 6,
        component: 'SealdoaaPage',
        icon: 'ios-paper-outline',
        title: 'دعاء الختم'
      }
    ];
  }
  public navTo(page:string, params:any={}):void {
    this.navCtrl.push(page, params)
  }

}
