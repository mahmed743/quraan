import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {UserDailyWerd, WerdProvider} from "../../providers/werd/werd";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
type DailyReadCategory = 'static' | 'private';

@IonicPage()
@Component({
  selector: 'page-dailyread',
  templateUrl: 'dailyread.html',
  animations: [
    trigger('werdstatus', [
      state('inactive', style({
        transform: 'translateX(0)'
      })),
      state('active',   style({
        transform: 'translateX(100%)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition('void => *', [
        style({transform: 'translateY(150px) scale(0.2)'}),
        animate(250)
      ])])]
})
export class DailyreadPage {
  dailyReadCategory: DailyReadCategory = 'private';
  privateDailyRead:any[] = [];
  staticDailyWerds: any[] = [];
  appLang: string;
  userDailyRead: UserDailyWerd[]= [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public werdProvider: WerdProvider,
  ) {

    this.appLang = this.navParams.get('lang');
  }

  ionViewDidLoad() {
    Promise.all([this.werdProvider.addStaticWerds()
      ,this.werdProvider.getPrivateWerd()
      ]).then(data=>[this.staticDailyWerds, this.privateDailyRead ] = [...data]);

    this.werdProvider.getUserPrivateWerds()
      .then((data:UserDailyWerd[])=>{
        this.userDailyRead = data;
        console.log('user daily read', data);

      })
  }

  toggle(doaa) {

  }

  goToQuran(pageNumber) {
    console.log('read page number', pageNumber);
    this.navCtrl.push('ExplainPage', {root: 'ExplainPage', initPage: pageNumber, from:'dailyReadPage'})
  }
  addWerd() {

    const modal = this.modalCtrl.create('AddwerdPage');
    modal.onDidDismiss((data)=>{
      console.log('data from modal', data);
      if(data&&data.length)
        this.privateDailyRead = data;
    })
    modal.present();
  }

  async removeWerd(werd) {
      this.privateDailyRead = await this.werdProvider.removePrivateWerd(werd.id);
      console.log(this.privateDailyRead);
  }

}
