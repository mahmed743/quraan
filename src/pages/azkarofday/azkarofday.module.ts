import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AzkarofdayPage } from './azkarofday';
import { TranslateModule } from '@ngx-translate/core';
import { AzkarproviderProvider } from '../../providers/azkarprovider/azkarprovider';

@NgModule({
  declarations: [
    AzkarofdayPage,
  ],
  imports: [
    IonicPageModule.forChild(AzkarofdayPage),
    TranslateModule
  ],
  providers: [
    AzkarproviderProvider
  ]
})
export class AzkarofdayPageModule {}
