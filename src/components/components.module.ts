import { NgModule } from '@angular/core';
import { AyataudioComponent } from './ayataudio/ayataudio';
import { ControlbrightnessComponent } from './controlbrightness/controlbrightness';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [AyataudioComponent,
    ControlbrightnessComponent],
	imports: [CommonModule, FormsModule, IonicModule],
	exports: [AyataudioComponent,
    ControlbrightnessComponent]
})
export class ComponentsModule {}
