import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PraytimeProvider } from '../../providers/praytime/praytime';
import {toPairs} from 'lodash';

@IonicPage()
@Component({
  selector: 'page-salahtimes',
  templateUrl: 'salahtimes.html',
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
