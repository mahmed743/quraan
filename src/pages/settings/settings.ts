import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {ConfigProvider} from "../../providers/config/config";
import {DocumentDirection} from "ionic-angular/platform/platform";

export enum langDir {
  'ar' = 'rtl',
  'en' = 'ltr'
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
              public configProvider: ConfigProvider
              ) {
  }

  async ionViewDidLoad() {
    this.settings.lang = await this.configProvider.getAppLang();
  }

  changeLang(lang:string) {
    this.settings.lang = lang;
    this.platform.setDir(langDir[lang] as DocumentDirection, true);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.configProvider.changeLang(lang);
  }
}
