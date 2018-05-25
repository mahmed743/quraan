import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QuraanProvider} from "../../providers/quraan/quraan";
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  appLang: string;
  searchText:string = '';
  matched: any[] = [];
  matchCount: number;
  loader: boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public quranProvider: QuraanProvider
              ) {
  }

  ionViewDidEnter() {
    this.appLang = this.navParams.get('lang');
    console.log(this.navParams.data)
  }

  search() {
    console.log(this.searchText);

    if (this.searchText&&this.searchText.trim()) {
      this.loader = true;

      this.quranProvider.searchQuran(this.searchText, this.appLang)
        .debounceTime(200)
        .distinctUntilChanged()
        .subscribe((result: { code: number, status: string, data: any }) => {
          console.log(result);
          if (result&&result.status === 'OK') {
            this.loader = false;
            this.matchCount = result.data.count;
            this.matched = [];
            result.data.matches.forEach(match => {
              this.matched.push({
                ayahNumber: match.numberInSurah,
                surahNumber: match.surah.number,
                text: match.text.replace(this.searchText, '<span class="matched">$&</span>'),
                surahName: match.surah.name
              })
            })
          }
        }, err => {
          this.loader = false;
        });
    }
  }

  onSearchClear() {
    console.log('search cleared')
  }

}
