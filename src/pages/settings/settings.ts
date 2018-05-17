import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, Config} from 'ionic-angular';
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
export class SettingsPage {
  settings: any = {
    lang: 'ar',
    werdNotifications: true,
    prayNotifications: true
  };
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public translate: TranslateService,
              public configProvider: ConfigProvider,
              public config: Config
              ) {
  }

  async ionViewDidLoad() {
    this.settings.lang = await this.configProvider.getAppLang();
  }

  changeTafseer(tafsserName) {
    this.configProvider.selectedTafseer = tafsserName;
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
