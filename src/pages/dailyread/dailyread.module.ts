import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyreadPage } from './dailyread';
import {WerdProvider} from "../../providers/werd/werd";

@NgModule({
  declarations: [
    DailyreadPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyreadPage),
  ],
  providers: [
    WerdProvider
  ]
})
export class DailyreadPageModule {}
