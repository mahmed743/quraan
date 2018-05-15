import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PraytimeProvider } from '../../providers/praytime/praytime';
import {toPairs} from 'lodash';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
@IonicPage()
@Component({
  selector: 'page-salahtimes',
    templateUrl: 'salahtimes.html',
    animations: [
      trigger('itemEnter', [
        transition('void => *', [
          style({ transform: 'translateX(0)' }),
          animate(250)
        ]), transition('* => void', [
          style({ transform: 'translateX(100%)' }),
          animate(250)
        ]) 
    ])
  ]
})
export class SalahtimesPage {
  times: any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public prayTime: PraytimeProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalahtimesPage');
    this.getUserDataFormIp();
  }

  getUserDataFormIp() {
    this.prayTime.getUserDataFormIp()
    .subscribe((res:any) => {
      console.log(res);
      let resultData = {
        latitude: res.loc.split(',')[0],
        longitude: res.loc.split(',')[1],
        ip: res.ip,
        address: res.city + ' ' + res.country
      };
      console.log(resultData);
      this.prayTime.getPrayTime(resultData.latitude, resultData.longitude)
        .subscribe((data:any)=>{
          console.log('Pray Data', data);
          this.times = toPairs(data.data.timings).filter(time=>(time[0]!='Sunset'&&time[0]!='Imsak'&&time[0]!='Midnight'))
          console.log(this.times);

        })

    });
  }

}
