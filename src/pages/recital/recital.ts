import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {QuraanProvider} from "../../providers/quraan/quraan";
import {values} from  'lodash'
import 'rxjs/add/operator/pluck';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Brightness } from '@ionic-native/brightness';

export enum AnimationStateToggle {
  'inactive',
  'active'
}
@IonicPage()
@Component({
  selector: 'page-recital',
  templateUrl: 'recital.html',
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
      state('active',   style({
        transform: 'translateX(0)'
      })),
      transition('inactive => active', animate('250ms ease-in')),
      transition('active => inactive', animate('250ms ease-out')),
    ])
  ]
})
export class RecitalPage {
  verses:any[];
  pageNum: number = 1;
  audio:HTMLAudioElement;
  isOn:boolean = false;
  showAudioControls: AnimationStateToggle | keyof AnimationStateToggle | string = AnimationStateToggle[1];
  clickTime: number = 0;
  brightness: number = 0;
  showBrightnessPanel: boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public quraanProvider: QuraanProvider,
    public brightnessNative: Brightness,
              public platform: Platform
              //public quraan: Quran
  ) {

  }

  async ionViewDidLoad() {
    console.log(this.navParams.data);
    if (this.navParams.get('initPage')) {
      this.pageNum = this.navParams.get('initPage');
    }
    if (this.platform.is('cordova')) {
      this.brightness = await this.brightnessNative.getBrightness();
    }
    this.getPage();
    this.audio = new Audio('assets/001.mp3');
  }
  ionViewWillLeave() {
    this.isOn = false;
    this.audio.pause()
  }
  changePlayState() {
    this.isOn = !this.isOn;
    this.isOn?this.audio.play():this.audio.pause()
  }

  getPage(num=1) {
    this.quraanProvider.getPage(num)
      .pluck('quran', 'quran-simple')
      .subscribe(data=>{
        console.log(data,values(data));
        this.verses = values(data).map((verse,i)=>({...verse, selected:!i}));
      })
  }
  popPage() {

    this.navCtrl.setRoot('HomePage', {}, {animate:true})
    //this.navCtrl.popToRoot()
  }
  changePage(change) {
    this.pageNum += change;
    //this.getPage(this.pageNum+=change);
  }
  selectVerse(verse) {
    this.verses = values(this.verses).map(ver=>({...ver, selected:ver==verse}));

  }
  trackByFn(index, item) {
    return index; // or item.id
  }

  toggleAudioCtrl() {
    console.log(this.showAudioControls);
    this.showAudioControls = this.showAudioControls==AnimationStateToggle[1]?AnimationStateToggle[AnimationStateToggle.inactive]:AnimationStateToggle[AnimationStateToggle.active];
    console.log(this.showAudioControls);
  }
  contentSwipe(event) {
    console.log(event, event.direction);
    if (event.direction === 1 || event.direction === 4) {
      this.changePage(1);
      console.info('left to right');
    } else if (event.direction === 2) {
      this.changePage(-1);
      console.info('right to left')
    }
  }
  brightChange(event: any) {
    console.log(event);
    this.brightnessNative.setBrightness(event / 10)
  }
  surahClicked() {

    if (this.clickTime == 0) {
      this.clickTime = +Date.now()
    } else {
      if ((+Date.now() - this.clickTime) < 800) {
        this.toggleAudioCtrl();
        this.showBrightnessPanel = false;
      }
      this.clickTime = 0

    }
  }
}
