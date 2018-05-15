import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalahtimesPage } from './salahtimes';
import { PraytimeProvider } from '../../providers/praytime/praytime';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';
import { AppnotificatiosProvider } from '../../providers/appnotificatios/appnotificatios';

@NgModule({
  declarations: [
    SalahtimesPage,
  ],
  imports: [
    IonicPageModule.forChild(SalahtimesPage),
    TranslateModule.forChild(),
    PipesModule
  ],
  providers: [
    PraytimeProvider,
    AppnotificatiosProvider,
  ]
})
export class SalahtimesPageModule {}
