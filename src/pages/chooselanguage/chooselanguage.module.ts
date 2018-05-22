import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooselanguagePage } from './chooselanguage';
import { ConfigProvider } from '../../providers/config/config';

@NgModule({
  declarations: [
    ChooselanguagePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooselanguagePage),
  ],
  providers: [
    ConfigProvider
  ]
})
export class ChooselanguagePageModule {}
