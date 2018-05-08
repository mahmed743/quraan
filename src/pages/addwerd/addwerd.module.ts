import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddwerdPage } from './addwerd';
import {WerdProvider} from "../../providers/werd/werd";

@NgModule({
  declarations: [
    AddwerdPage,
  ],
  imports: [
    IonicPageModule.forChild(AddwerdPage),
  ],
  providers: [
    WerdProvider
  ]
})
export class AddwerdPageModule {}
