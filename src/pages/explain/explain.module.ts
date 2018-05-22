import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExplainPage } from './explain';
import {QuraanProvider} from "../../providers/quraan/quraan";
import { ConfigProvider } from '../../providers/config/config';
import {TranslateModule} from "@ngx-translate/core";
import { ComponentsModule } from '../../components/components.module';
import { Brightness } from '@ionic-native/brightness';

@NgModule({
  declarations: [
    ExplainPage,
  ],
  imports: [
    IonicPageModule.forChild(ExplainPage),
    TranslateModule,
    ComponentsModule
  ],
  providers: [
    QuraanProvider,
    ConfigProvider,
    Brightness
  ]
})
export class ExplainPageModule {}
