import { Component, OnChanges, SimpleChanges } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, Config, Events} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {ConfigProvider} from "../../providers/config/config";
import {DocumentDirection} from "ionic-angular/platform/platform";

export enum langDir {
  'ar' = 'rtl',
  'en' = 'ltr',
  'rtl' = 'ar',
  'ltr' = 'en'
}
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnChanges{
  settings: any = {
    lang: 'ar',
    werdNotifications: true,
    prayNotifications: true,
    showAzkarIcon: false
  };
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public translate: TranslateService,
              public configProvider: ConfigProvider,
              public config: Config,
              public events: Events
              ) {
  }

  async ionViewDidLoad() {
    this.settings.lang = this.navParams.get('lang');
    let preferences = await this.configProvider.getPreferences();

    this.settings = { ...this.settings, ...preferences };
    console.log(this.settings);
  }
  ngOnChanges(changes:SimpleChanges) {
    console.log(changes);
  }

  changeVisibilityAzkarIcon(event) {
    console.log(event);
    this.configProvider.setPreferences('showAzkarIcon', event);
    this.events.publish('preference:change', { showAzkarIcon: event})
    
  }

  changeTafseer(tafsserName) {
    this.configProvider.selectedTafseer = tafsserName;
  }
  changePartsNumber(number) {
    this.configProvider.setPreferences('partsNumber', number)
  }

  changeLang(lang:string) {
    this.settings.lang = lang;
    this.platform.setDir(langDir[lang] as DocumentDirection, true);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.config.set('backButtonIcon', 'arrow-'+(lang==='ar'?'forward':'back'));
    this.configProvider.changeLang(lang);
    console.log('config change detector', this.config.get('backButtonIcon'))
  }
}
