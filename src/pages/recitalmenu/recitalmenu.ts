import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RecitalPage} from "../recital/recital";



@IonicPage()
@Component({
  selector: 'page-recitalmenu',
  templateUrl: 'recitalmenu.html',
})
export class RecitalmenuPage {
  recitalPage:string = 'RecitalPage';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}