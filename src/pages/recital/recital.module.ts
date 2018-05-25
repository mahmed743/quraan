import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecitalPage } from './recital';
import {QuraanProvider} from "../../providers/quraan/quraan";
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { Brightness } from '@ionic-native/brightness';
import { ConfigProvider } from '../../providers/config/config';

@NgModule({
  declarations: [
    RecitalPage,
  ],
  imports: [
    IonicPageModule.forChild(RecitalPage),
    TranslateModule,
    ComponentsModule,
    
  ],
  providers: [
    QuraanProvider,
    Brightness,
    ConfigProvider
  ]
})
export class RecitalPageModule {}
