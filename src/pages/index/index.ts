import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
enum partsNames {
  'الأول' = 1, "الثانى","الثالث","الرابع","الخامس","السادس","السابع","الثامن","التاسع", "العاشر", 'الحادى عشر', "الثانى عشر","الثالث عشر","الرابع عشر","الخامس عشر","السادس عشر","السابع عشر","الثامن عشر","التاسع عشر", "العشرون", 'الواحد والعشرون' , "الثانى والعشرون","الثالث والعشرون","الرابع والعشرون","الخامس والعشرون","السادس والعشرون","السابع والعشرون","الثامن والعشرون","التاسع والعشرون", "الثلاثون",
}
declare let  Quran;
type ActiveList = 'parts' | 'surah';
enum ActiveListTrigger {
  parts,
  surah
}

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
  animations: [
    trigger('partsState', [
      state('inactive', style({
        transform: 'translateX(0)'
      })),
      state('active',   style({
        transform: 'translateX(100%)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition('void => *', [
        style({transform: 'translateY(150px) scale(0.2)'}),
        animate(250)
      ]),
      // transition('* => void', [
      //   animate(250, style({transform: 'translateX(100%)'}))
      // ])

    ])
  ]
})
export class IndexPage {
  partsNum = Array(30);
  juzSurahs = [];
  partsState: boolean;
  appLang: string;
  activeList:ActiveList = 'parts';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
  ionViewDidEnter() {
    this.appLang = this.navParams.get('lang');
  }
  ionViewDidLoad() {

  }

  public partName(index:number) {
    return partsNames[index+1]
  }

  selectJuz(juzNumber) {
    console.log(Quran.surah.name(juzNumber, 'arabic_name'))
    let juzStart = Quran.ayah.fromJuz(juzNumber);
    console.log(juzStart);
    let [surahName, ayahNumber, nextSurahName] = [Quran.surah.name(juzStart.surah), juzStart.ayah, Quran.surah.name(juzStart.surah + 1)];
    let pageNum = Quran.ayah.page(juzStart.surah, juzStart.ayah);
    console.log(`
      surah Name: ${surahName}
      ayahNumber: ${ayahNumber}
      nextSurahName: ${nextSurahName}
      pageNumber: ${pageNum}
      ${Quran.ayah.page(1)}
    `);
    this.juzSurahs = [];
    this.juzSurahs.push({ surahName, ayahNumber, pageNumber: 1||pageNum });
    if (surahName != nextSurahName) {
      this.juzSurahs.push({ surahName: nextSurahName, ayahNumber, pageNumber: 1||pageNum})
    }

  }

  public goTo(page: string, id) {
    this.navCtrl.push(page, { initPage: id });
  }
  changeList(listId:ActiveList, juzId) {
    let nextList = ActiveListTrigger[ActiveListTrigger[listId]+1] as ActiveList;
    console.log(nextList);
    if(nextList)
      this.activeList = nextList;
    
    this.selectJuz(juzId);
    
  }
  goBack() {
    if (this.activeList === 'surah') {
      this.activeList = ActiveListTrigger[0] as ActiveList
    } else {
      this.navCtrl.pop()
    }
  }


}
