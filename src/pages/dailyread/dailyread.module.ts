import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyreadPage } from './dailyread';
import {WerdProvider} from "../../providers/werd/werd";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DailyreadPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyreadPage),
    TranslateModule
  ],
  providers: [
    WerdProvider,
  ]
})
export class DailyreadPageModule {}
