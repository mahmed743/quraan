import { NgModule } from '@angular/core';
import { IonicPageModule, MenuClose } from 'ionic-angular';
import { RecitalmenuPage } from './recitalmenu';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigProvider } from '../../providers/config/config';

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
    ConfigProvider
  ]
})
export class RecitalmenuPageModule {}
