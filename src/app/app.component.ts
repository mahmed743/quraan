import {Component} from '@angular/core';
import {Platform, Config, App, ToastController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from '@ngx-translate/core';
import {ConfigProvider} from "../providers/config/config";
import {langDir} from "../pages/settings/settings";

export type DocumentDirection = 'ltr' | 'rtl';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  counter: number = 0;
  constructor(public platform: Platform,
              public app:App,
              public toastCtrl: ToastController,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public translate: TranslateService,
              configProvider: ConfigProvider,
              config: Config
  ) {


    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      configProvider.getAppLang()
      .then(lang => {
        if (lang) {
          translate.setDefaultLang(lang);
          translate.use(lang);
          this.platform.setDir(langDir[lang] as DocumentDirection, true);
          config.set('backButtonIcon', 'arrow-'+(lang==='ar'?'forward':'back'));
          console.log('App Language', lang, translate.currentLang);
          this.rootPage = 'RecitalmenuPage';
        } else {
          this.rootPage = 'ChooselanguagePage';
        }

      });
    });
    this.handleBackButton();
  }

  handleBackButton(){
    this.platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        if(this.app.getActiveNavs()[0].canGoBack()){
          this.app.getActiveNavs()[0].pop();
        } else{
          this.counter++;
          this.presentToast();
          setTimeout(() => { this.counter = 0 }, 1500)
        }
      } else {
        this.platform.exitApp();
      }
    }, 1)

  }

  presentToast() {
    this.translate.get('pressToExit')
      .subscribe(translated=>{
        let toast = this.toastCtrl.create({
          message: translated,
          showCloseButton: true,
          dismissOnPageChange: true,
          closeButtonText: 'X'
        });
        toast.present()
      });
  }
}

