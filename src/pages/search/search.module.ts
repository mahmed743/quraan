import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { TranslateModule } from '@ngx-translate/core';
import {QuraanProvider} from "../../providers/quraan/quraan";

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    TranslateModule
  ],
  providers:[
    QuraanProvider
  ]
})
export class SearchPageModule {}
