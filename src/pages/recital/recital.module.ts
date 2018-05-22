import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecitalPage } from './recital';
import {QuraanProvider} from "../../providers/quraan/quraan";
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { Brightness } from '@ionic-native/brightness';

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
    Brightness
  ]
})
export class RecitalPageModule {}
