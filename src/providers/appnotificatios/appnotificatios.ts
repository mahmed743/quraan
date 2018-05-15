
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';


@Injectable()
export class AppnotificatiosProvider {

  constructor(
    public localNotification: LocalNotifications) {

  }

  scheduleNotifications(text, time) {
    this.localNotification.schedule(
      {
        text ,
        trigger: { at: time },
        led: 'FF0000',
        sound: null
      }
    )
  }

}
