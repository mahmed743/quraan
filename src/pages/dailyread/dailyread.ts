import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {WerdProvider} from "../../providers/werd/werd";
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
  // transition('* => void', [
  //   animate(250, style({transform: 'translateX(100%)'}))
  // ])
})
export class DailyreadPage {
  dailyReadCategory: DailyReadCategory = 'static';
  privateDailyRead:any[] = [];
  staticDailyWerds: any[] = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public werdProvider: WerdProvider
    ) {
  }

  ionViewDidLoad() {
    this.werdProvider.addStaticWerds()
      .then(data=>{
        console.log('static werds',data);
        this.staticDailyWerds = data;
      });
    this.werdProvider.getPrivateWerd()
      .then(data=>{
        console.log('private werds',data);
        this.privateDailyRead = data
      });
  }

  toggle(doaa) {

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
