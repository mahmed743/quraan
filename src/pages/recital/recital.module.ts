import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecitalPage } from './recital';

@NgModule({
  declarations: [
    RecitalPage,
  ],
  imports: [
    IonicPageModule.forChild(RecitalPage),
  ],
})
export class RecitalPageModule {}
