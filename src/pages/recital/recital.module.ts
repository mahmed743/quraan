import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecitalPage } from './recital';
import {QuraanProvider} from "../../providers/quraan/quraan";

@NgModule({
  declarations: [
    RecitalPage,
  ],
  imports: [
    IonicPageModule.forChild(RecitalPage),
  ],
  providers: [
    QuraanProvider
  ]
})
export class RecitalPageModule {}
