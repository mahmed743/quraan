import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExplainPage } from './explain';
import {QuraanProvider} from "../../providers/quraan/quraan";

@NgModule({
  declarations: [
    ExplainPage,
  ],
  imports: [
    IonicPageModule.forChild(ExplainPage),
  ],
  providers: [
    QuraanProvider
  ]
})
export class ExplainPageModule {}
