import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from '@ngx-translate/core';
import {ConfigProvider} from "../providers/config/config";
import {langDir} from "../pages/settings/settings";
import {DocumentDirection} from "ionic-angular/platform/platform";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'HomePage';

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              translate: TranslateService,
              configProvider: ConfigProvider
  ) {
    configProvider.getAppLang()
      .then(lang => {
        console.log('App Language', lang);
        translate.setDefaultLang(lang);
        translate.use(lang);
        platform.setDir(langDir[lang] as DocumentDirection, true);
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }
}

