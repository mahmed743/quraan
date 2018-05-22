import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'control-brightness',
  templateUrl: 'controlbrightness.html'
})
export class ControlbrightnessComponent {
  @Input('brightness') brightness: number = 0;
  @Input('direction') direction: string = 'ltr';
  @Output() onBrightChange:EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log(this.brightness);
  }

  changeBrightness(value) {
    //this.brightness = value;
    this.onBrightChange.emit(value/100);
  }

}
