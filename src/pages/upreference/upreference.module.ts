import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpreferencePage } from './upreference';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UpreferencePage,
  ],
  imports: [
    IonicPageModule.forChild(UpreferencePage),
    TranslateModule
  ],
})
export class UpreferencePageModule {}
