
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class ConfigProvider {

  constructor(public storage: Storage) {
    
  }

}
