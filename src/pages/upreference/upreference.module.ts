import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpreferencePage } from './upreference';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigProvider } from '../../providers/config/config';

@NgModule({
  declarations: [
    UpreferencePage,
  ],
  imports: [
    IonicPageModule.forChild(UpreferencePage),
    TranslateModule
  ],
  providers: [
    ConfigProvider
  ]
})
export class UpreferencePageModule {}
