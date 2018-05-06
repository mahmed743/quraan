import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-recital',
  templateUrl: 'recital.html',
})
export class RecitalPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecitalPage');
  }

  popPage() {

    this.navCtrl.setRoot('HomePage', {}, {animate:true})
    //this.navCtrl.popToRoot()
  }
}
