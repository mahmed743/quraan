import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyreadPage } from './dailyread';

@NgModule({
  declarations: [
    DailyreadPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyreadPage),
  ],
})
export class DailyreadPageModule {}
