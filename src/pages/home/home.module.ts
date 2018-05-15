import {NgModule} from "@angular/core";
import {HomePage} from "./home";
import {IonicPageModule} from "ionic-angular";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@NgModule({
  declarations: [HomePage],
  imports: [
    IonicPageModule.forChild(HomePage)
  ],
  providers: [
    LocalNotifications,
    ScreenOrientation
  ]
})

export class HomeModule {}
