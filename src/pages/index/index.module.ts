import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndexPage } from './index';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    IndexPage,
  ],
  imports: [
    IonicPageModule.forChild(IndexPage),
    TranslateModule
  ],
})
export class IndexPageModule {}
