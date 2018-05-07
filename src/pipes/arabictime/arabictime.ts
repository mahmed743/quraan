import { Pipe, PipeTransform } from '@angular/core';
import { MinLengthValidator } from '@angular/forms';

@Pipe({
  name: 'arabictime',
})
export class ArabictimePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let [hour, minute] = value.split(':');

    let dayPart = (Number(hour)>=12)?'م':'ص';

    return  ((+hour>12)?(+hour-12):hour)+':' +minute +' '+ dayPart;
  }
}
