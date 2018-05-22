
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
export interface TafseerId {
  id?:number,
  resource_name: string,
  name: string
}
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
  constructor(public storage: Storage) {
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
}
