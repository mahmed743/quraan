
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular';


@Injectable()
export class AppnotificatiosProvider {

  constructor(
    public localNotification: LocalNotifications,
    public platform: Platform) {

  }

  scheduleNotifications(text, time) {
    this.localNotification.schedule(
      {
        text ,
        trigger: { at: time },
        led: 'FF0000',
        sound: this.platform.is('android') ? 'assets/ns.mp3' : 'file://beep.caf',
      }
    )
  }

}
