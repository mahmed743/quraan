import { NgModule } from '@angular/core';
import { IonicPageModule, MenuClose } from 'ionic-angular';
import { RecitalmenuPage } from './recitalmenu';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RecitalmenuPage,
  ],
  imports: [
    IonicPageModule.forChild(RecitalmenuPage),
    TranslateModule
  ],
  providers: [
    MenuClose
  ]
})
export class RecitalmenuPageModule {}
