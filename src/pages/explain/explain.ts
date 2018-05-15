import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QuraanProvider} from "../../providers/quraan/quraan";

import {values} from  'lodash';
import 'rxjs/add/operator/pluck';

@IonicPage()
@Component({
  selector: 'page-explain',
  templateUrl: 'explain.html',
})
export class ExplainPage {
  verses:any[];
  pageNum: number = 1;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public quraanProvider: QuraanProvider,) {
  }
  ionViewDidLoad() {
    this.getPage();
  }

  getPage(num=1) {
    this.quraanProvider.getPage(num)
      .pluck('quran', 'quran-simple')
      .subscribe(data=>{
        console.log(data,values(data));
        this.verses = values(data).map(verse=>({...verse, selected:false}));
      })
  }
  popPage() {

    this.navCtrl.setRoot('HomePage', {}, {animate:true})
    //this.navCtrl.popToRoot()
  }
  changePage(change) {
    this.getPage(this.pageNum+=change)
  }
  selectVerse(verse) {
    this.verses = values(this.verses).map(ver=>({...ver, selected:ver==verse}));

  }
  trackByFn(index, item) {
    return index; // or item.id
  }

}
