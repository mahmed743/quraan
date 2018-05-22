import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config } from 'ionic-angular';
import { DocumentDirection, Platform } from 'ionic-angular/platform/platform';
import { langDir } from '../settings/settings';
import { TranslateService } from '@ngx-translate/core';
import { ConfigProvider } from '../../providers/config/config';


@IonicPage()
@Component({
  selector: 'page-chooselanguage',
  templateUrl: 'chooselanguage.html',
})
export class ChooselanguagePage {
  appLang: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public platform: Platform,
    public config: Config,
    public configProvider: ConfigProvider,

  ) {
  }

  ionViewDidLoad() {
    this.appLang = this.translate.currentLang;
    console.log(this.appLang);
  }

  changeLang(lang: string) {
    this.platform.setDir(langDir[lang] as DocumentDirection, true);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.config.set('backButtonIcon', 'arrow-' + (lang === 'ar' ? 'forward' : 'back'));
    this.configProvider.changeLang(lang);
    console.log('config change detector', this.config.get('backButtonIcon'));
    this.navCtrl.setRoot('HomePage')
  }

}
