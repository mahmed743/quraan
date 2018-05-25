import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PraytimeProvider } from '../../providers/praytime/praytime';
import {toPairs} from 'lodash';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AppnotificatiosProvider } from '../../providers/appnotificatios/appnotificatios';
import { TranslateService } from '@ngx-translate/core';
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
  appLang:string;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public prayTime: PraytimeProvider,
    public appNotifications: AppnotificatiosProvider,
    public translate: TranslateService,
    public platform: Platform
    ) {
  }

  ionViewDidLoad() {
    this.getUserDataFormIp();
    this.appLang = this.navParams.get('lang');
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
         
          if (this.platform.is('cordova')) {
            let schedules = [];
            this.times.forEach(async (time, index) => {
              let [salah, date] = time;
              let salahTranslatedName = await this.translate.get(salah).toPromise();
              schedules.push({
                id: index+=3,
                text: 'تذكير بقراءة الورد اليومى',
                trigger: { at: new Date(new Date(date).getTime()) },
                led: 'FF0000',
                sound: 'assets/ns.mp3',
                data: { page: 'DailyreadPage' }
              });
            });
            this.appNotifications.localNotification.schedule(schedules);
            this.appNotifications.localNotification.getAll()
              .then(n => {
                alert('All notifications' + JSON.stringify(n, null, 4))
              })
          }
          
        })

    });
  }

  dayTime(time) {
    let hour = time.split(':')[0];
    return time + (hour>=12?' PM':' AM')
  }

}
