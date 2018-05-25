import { NgModule } from '@angular/core';
import { IonicPageModule, MenuClose } from 'ionic-angular';
import { RecitalmenuPage } from './recitalmenu';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigProvider } from '../../providers/config/config';
import { AppnotificatiosProvider } from '../../providers/appnotificatios/appnotificatios';

@NgModule({
  declarations: [
    RecitalmenuPage,
  ],
  imports: [
    IonicPageModule.forChild(RecitalmenuPage),
    TranslateModule
  ],
  providers: [
    MenuClose,
    ConfigProvider,
    AppnotificatiosProvider
  ]
})
export class RecitalmenuPageModule {}
