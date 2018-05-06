import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExplainPage } from './explain';

@NgModule({
  declarations: [
    ExplainPage,
  ],
  imports: [
    IonicPageModule.forChild(ExplainPage),
  ],
})
export class ExplainPageModule {}
