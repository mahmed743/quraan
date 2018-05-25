
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
export interface TafseerId {
  id?:number,
  resource_name: string,
  name: string
}
export interface SurasNames { Suras_Name: { id: string, name: string }[] }
export type tafsirNames = 'المیسر'|'ابن كثير'|'Arabic Qurtubi Tafseer'|'Arabic Saddi Tafseer'|'Arabic Tanweer Tafseer'|'Arabic Waseet Tafseer'|'Arabic Baghawy Tafseer'|'الطبري';

@Injectable()
export class ConfigProvider {
  private _availableTafseers: TafseerId[];
  public tafseerName: string ;
  public defaultTafseerName:tafsirNames = 'Arabic Saddi Tafseer';
  public defaultLang: string = 'ar';
  public preferences: any = {};
  defaultPreferences = {
    showAzkarIcon: true
  }
  constructor(public storage: Storage, public http: HttpClient) {
    this.getPreferences().then(pref => this.preferences = pref);
  }
  public async getTafseerName() {
    let tafseerName = await  this.storage.get('tafseer:name');
    //console.log('Config Tafseer Name', tafseerName);
    return this.tafseerName = tafseerName || this.defaultTafseerName;
  }

  async getPreferences() {
    return this.getStoredPreferences()
      .then(pref => {
        pref = pref || {};
        return this.preferences = { ...this.defaultPreferences, ...pref };
      });
  }
  private getStoredPreferences() {
    return this.storage.get('user:preferences');
  }

  public async setPreferences(prop, value) {
    let preferences = await this.getPreferences();
    return this.storage.set('user:preferences', { ...preferences, ...{ [prop]: value } });
  }

  public get availableTafssers():TafseerId[] {
    this._availableTafseers = [
      {
        id: 1,
        "resource_name": "المیسر",
        "name": "الميسر",
      },
      {
        id: 3,
        "resource_name": "ابن كثير",
        "name": "ابن كثير",
      },
      {
        id: 2,
        "resource_name": "Arabic Qurtubi Tafseer",
        "name": "القرطبى"
      },
      {
        id: 4,
        "resource_name": "Arabic Saddi Tafseer",
        "name": "السعدى"
      },
      {
        id: 5,
        "resource_name": "Arabic Tanweer Tafseer",
        "name": "التنوير"
      },{
        id: 6,
        "resource_name": "Arabic Waseet Tafseer",
        "name": "الوسيط"
      },
      {
        id: 7,
        "resource_name": "Arabic Baghawy Tafseer",
        "name": "البغوى"
      }, {
        id: 8,
        "resource_name": "الطبري",
        "name": "الطبرى"
      }
    ];

    return this._availableTafseers
  }

  public set selectedTafseer(tafseerName: string) {
    this.tafseerName = tafseerName;
    this.storage.set('tafseer:name', this.tafseerName)
      .then(d=>{
        console.info('tafsser saved', d)
      })
  }

  public changeLang(lang) {
    return this.storage.set('app:lang', lang)
  }
  public getAppLang() {
    return this.storage.get('app:lang')
  }

  get surasNames() {
    return this.storage.get('suras:names')
      .then(suras => suras&&suras.length > 0 ? suras : this.getSurahNames())
      .then(fetched => this.storage.set('suras:names', fetched))
  }
  getSurahNames() {
    return this.http.get('https://mp3quran.net/api/_arabic_sura.json').pluck('Suras_Name').toPromise()
  }

  get JuzPageNumbers() {
    return [
      [1, 1],
      [2,22],
      [3,42],
      [4, 62],
      [5,82],
      [6,102],
      [7, 122],
      [8,142],
      [9,162],
      [10, 182],
      [11,202],
      [12,222],
      [13, 242],
      [14,262],
      [15,282],
      [16, 302],
      [17,322],
      [18,342],
      [19, 362],
      [20,382],
      [21,402],
      [22, 422],
      [23,442],
      [24,462],
      [25, 482],
      [26,502],
      [27,522],
      [28, 542],
      [29,562],
      [30,582],
    ]
  }
}
