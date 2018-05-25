import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, Events} from 'ionic-angular';
import {QuraanProvider} from "../../providers/quraan/quraan";
import {File} from '@ionic-native/file';
import {values} from 'lodash';
import 'rxjs/add/operator/pluck';
import {DocumentViewer} from '@ionic-native/document-viewer';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {AnimationStateToggle} from '../recital/recital';
import {ConfigProvider, TafseerId} from '../../providers/config/config';
import { Brightness } from '@ionic-native/brightness';
import { langDir } from '../settings/settings';

export interface Verse {
  id: number,
  surah: number,
  ayah: number | string,
  text?: string,
  verse?: number
}

@IonicPage()
@Component({
  selector: 'page-explain',
  templateUrl: 'explain.html',
  animations: [
    trigger('slide', [
      state('inactive', style({
        transform: 'translateY(-120%)'
      })),
      state('active',   style({
        transform: 'translateY(0)'
      })),
      transition('inactive => active', animate('250ms ease-in')),
      transition('active => inactive', animate('250ms ease-out')),
    ]),
    trigger('show', [
      state('inactive', style({
        transform: 'translateX(120%)'
      })),
      state('active', style({
        transform: 'translateX(0)'
      })),
      transition('inactive => active', animate('250ms ease-in')),
      transition('active => inactive', animate('250ms ease-out')),
    ])
  ]
})
export class ExplainPage {
  verses: any[];
  selectedVers: Verse;
  pageNum: number = 1;
  tafseerName: string ;
  tafseer: string = '';
  allTafseers: TafseerId[];
  showTafseer: AnimationStateToggle | keyof AnimationStateToggle | string = AnimationStateToggle[1];
  clickTime: number = 0;
  brightness: number = 0;
  showBrightnessPanel: boolean = false;
  azkarIcon: string = 'ios-moon-outline';
  preferences: any = {};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public quraanProvider: QuraanProvider,
              public configProvider: ConfigProvider,
              public documentViewer: DocumentViewer,
              public file: File,
              public platform: Platform,
              public brightnessNative: Brightness,
              public events: Events
  ) {
  }
  async ionViewWillEnter() {
    this.preferences.showAzkarIcon = (await this.configProvider.getPreferences()).showAzkarIcon;
    let hour = new Date(Date.now()).getHours();
    if (hour < 18 && hour >= 4) {
      this.azkarIcon = 'ios-partly-sunny-outline';
    }
    this.events.subscribe('preference:change', changes => {
      console.log('explain page: preference change', changes);
      this.preferences = { ...this.preferences, ...changes };
    })
  }
  async ionViewDidLoad() {
    if (this.platform.is('cordova')) {
      this.brightness = (await this.brightnessNative.getBrightness()) * 100;
    }

    this.allTafseers = this.configProvider.availableTafssers;
    this.tafseerName = await this.configProvider.getTafseerName();
    this.getPage();
  }


  brightChange(event: any) {
    console.log(event);
    this.brightnessNative.setBrightness(event / 10)
  }
  openPDF() {
    this.documentViewer.viewDocument('assets/ngcourse2.pdf', 'application/pdf', {title: 'pdf file'})
  }



  getPage(num = 1) {
    this.quraanProvider.getPage(num)
      .pluck('quran', 'quran-simple')
      .subscribe(data => {
        this.verses = values(data).map((verse, index) => ({...verse, selected: index == 0}));
        this.selectedVers = this.verses[0];
        if (this.verses.length) {
          this.getTafseer(this.tafseerName);
        }
      }, err => {
        console.log('error getting page',JSON.stringify(err))
      })
  }

  goTo(page:string) {
    this.navCtrl.push(page, { lang: langDir[this.platform.dir()]})
  }
  popPage() {

    this.navCtrl.setRoot('HomePage', {}, {animate: true})
    //this.navCtrl.popToRoot()
  }

  changePage(change) {
    this.getPage(this.pageNum += change);

  }

  selectVerse(verse) {
    if (verse.id !== this.selectedVers.id) {
      this.verses = values(this.verses).map(ver => ({...ver, selected: ver == verse}));
      this.selectedVers = verse;
      this.showTafseer = 'active';
      console.log('verse =>', verse);
      this.getTafseer(this.tafseerName)
    }
  }

  getTafseer(tafseerName, surahNumber = this.selectedVers.surah, ayahNumber = this.selectedVers.ayah) {
    this.tafseerName = tafseerName;
    this.configProvider.selectedTafseer = tafseerName;
    this.quraanProvider.getTafseer(tafseerName, surahNumber, ayahNumber)
      .subscribe((result: any) => {
        console.info(result.tafsirs);
        let verseTafseer = result.tafsirs.find(x => x.resource_name == this.tafseerName);
        this.tafseer = verseTafseer.text;
      })
  }

  toggleTafseerCtrls() {
    this.showTafseer = this.showTafseer == AnimationStateToggle[1] ? AnimationStateToggle[AnimationStateToggle.inactive] : AnimationStateToggle[AnimationStateToggle.active];

  }

  trackByFn(index, item) {
    return index; // or item.id
  }
  surahClicked() {

    if (this.clickTime == 0) {
      this.clickTime = +Date.now()
    } else {
      if ((+Date.now() - this.clickTime) < 800) {
        this.toggleTafseerCtrls();
        this.showBrightnessPanel = false;
      }
      this.clickTime = 0

    }
  }


}
