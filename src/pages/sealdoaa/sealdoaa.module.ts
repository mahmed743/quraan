import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SealdoaaPage } from './sealdoaa';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SealdoaaPage,
  ],
  imports: [
    IonicPageModule.forChild(SealdoaaPage),
    TranslateModule
  ],
})
export class SealdoaaPageModule {}
