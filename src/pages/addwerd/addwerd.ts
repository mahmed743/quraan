import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {WerdProvider} from "../../providers/werd/werd";



@IonicPage()
@Component({
  selector: 'page-addwerd',
  templateUrl: 'addwerd.html',
})
export class AddwerdPage {
  werdtype = 'ayah';
  werdtext:string = '';
  werdname: string = '';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public werdProvider: WerdProvider
      ) {
  }

  ionViewDidLoad() {
  }

  dismissModal(data?:any) {
    this.viewCtrl.dismiss(data);
  }
  addWerd() {
    if (this.werdname&&this.werdname.trim()) {
      let werd:{name:string,type:string, text?:string} = {name: this.werdname, type: this.werdtype};
      if (this.werdtype == 'ayah') {werd.text = this.werdtext}
      this.werdProvider.addPrivateWerd(werd)
        .then(data=>{
          console.log('data from adding werd', data);
          this.dismissModal(data)
        })
    }
  }
}
