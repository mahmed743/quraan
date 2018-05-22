import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Generated class for the ControlbrightnessComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'control-brightness',
  templateUrl: 'controlbrightness.html'
})
export class ControlbrightnessComponent {
  @Input('brightness') brightness: number = 0;
  @Output() onBrightChange:EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log(this.brightness);
  }

  changeBrightness(value) {
    //this.brightness = value;
    this.onBrightChange.emit(value/10);
  }

}
