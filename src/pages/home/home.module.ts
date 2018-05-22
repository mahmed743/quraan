import {NgModule} from "@angular/core";
import {HomePage} from "./home";
import {IonicPageModule} from "ionic-angular";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TranslateModule } from "@ngx-translate/core";
import {Brightness} from "@ionic-native/brightness";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [HomePage],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule,
    ComponentsModule
  ],
  providers: [
    LocalNotifications,
    ScreenOrientation,
    Brightness
  ]
})

export class HomeModule {}
