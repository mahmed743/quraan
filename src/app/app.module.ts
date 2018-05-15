import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyApp } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { QuraanProvider } from '../providers/quraan/quraan';
import { PraytimeProvider } from '../providers/praytime/praytime';
import { WerdProvider } from '../providers/werd/werd';
import {IonicStorageModule} from '@ionic/storage';
import { AppnotificatiosProvider } from '../providers/appnotificatios/appnotificatios';
import { ConfigProvider } from '../providers/config/config';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { LocalNotifications } from '@ionic-native/local-notifications';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QuraanProvider,
    PraytimeProvider,
    WerdProvider,
    AppnotificatiosProvider,
    ConfigProvider,
    File,
    FileTransfer,
    DocumentViewer,
    LocalNotifications
  ]
})
export class AppModule {}
