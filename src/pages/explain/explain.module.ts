import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExplainPage } from './explain';
import {QuraanProvider} from "../../providers/quraan/quraan";
import { ConfigProvider } from '../../providers/config/config';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ExplainPage,
  ],
  imports: [
    IonicPageModule.forChild(ExplainPage),
    TranslateModule
  ],
  providers: [
    QuraanProvider,
    ConfigProvider
  ]
})
export class ExplainPageModule {}
