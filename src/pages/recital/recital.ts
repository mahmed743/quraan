import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
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

enum AudioStateToggle {
  'inactive',
  'active'
}
@IonicPage()
@Component({
  selector: 'page-recital',
  templateUrl: 'recital.html',
  animations: [
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
  showAudioControls: AudioStateToggle|keyof AudioStateToggle|string = AudioStateToggle[1];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public quraanProvider: QuraanProvider,
              //public quraan: Quran
              ) {
  }

  ionViewDidLoad() {
    this.getPage();
    this.audio = new Audio('//d1.islamhouse.com/data/ar/ih_quran/ar_Full_Quran_Teacher_Menshawe/ar_Quran_Teacher_Menshawe_112.mp3');
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
    this.getPage(this.pageNum+=change)
  }
  selectVerse(verse) {
    this.verses = values(this.verses).map(ver=>({...ver, selected:ver==verse}));

  }
  trackByFn(index, item) {
    return index; // or item.id
  }

  toggleAudioCtrl() {
    console.log(this.showAudioControls);
    this.showAudioControls = this.showAudioControls==AudioStateToggle[1]?AudioStateToggle[AudioStateToggle.inactive]:AudioStateToggle[AudioStateToggle.active];
    console.log(this.showAudioControls);
  }
  contentSwipe(dir) {
    console.log(dir)
  }

}
