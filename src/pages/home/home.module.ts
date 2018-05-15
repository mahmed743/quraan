import {NgModule} from "@angular/core";
import {HomePage} from "./home";
import {IonicPageModule} from "ionic-angular";
import { LocalNotifications } from '@ionic-native/local-notifications';


@NgModule({
  declarations: [HomePage],
  imports: [
    IonicPageModule.forChild(HomePage)
  ],
  providers: [
    LocalNotifications
  ]
})

export class HomeModule {}
