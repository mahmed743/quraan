import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import {TranslateModule} from "@ngx-translate/core";
import {ConfigProvider} from "../../providers/config/config";

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    TranslateModule
  ],
  providers: [
    ConfigProvider
  ]
})
export class SettingsPageModule {}
