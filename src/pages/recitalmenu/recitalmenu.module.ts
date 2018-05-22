import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
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
})
export class RecitalmenuPageModule {}
