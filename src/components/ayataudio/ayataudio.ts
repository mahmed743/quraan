import { Component } from '@angular/core';

/**
 * Generated class for the AyataudioComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ayataudio',
  templateUrl: 'ayataudio.html'
})
export class AyataudioComponent {

  text: string;

  constructor() {
    console.log('Hello AyataudioComponent Component');
    this.text = 'Hello World';
  }

}
