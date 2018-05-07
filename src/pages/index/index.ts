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
type ActiveList = 'parts' | 'surah' | 'ayah';
enum ActiveListTrigger {
  parts,
  surah,
  ayah
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
  surahNum = Array(3);
  partsState:boolean;
  activeList:ActiveList = 'parts';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(Quran.surah.name(1, 'arabic_name'))
    console.log(Quran.ayah.fromJuz(600))
  }

  public partName(index:number) {
    return partsNames[index+1]
  }

  public navTo() {}
  changeList(listId:ActiveList) {
    let nextList = ActiveListTrigger[ActiveListTrigger[listId]+1] as ActiveList;
    console.log(nextList);
    if(nextList)
    this.activeList = nextList
  }


}
