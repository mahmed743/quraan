import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecitalPage } from './recital';
import {QuraanProvider} from "../../providers/quraan/quraan";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RecitalPage,
  ],
  imports: [
    IonicPageModule.forChild(RecitalPage),
    TranslateModule
  ],
  providers: [
    QuraanProvider
  ]
})
export class RecitalPageModule {}
