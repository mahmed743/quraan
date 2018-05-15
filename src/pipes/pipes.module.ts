import { NgModule } from '@angular/core';
import { ArabictimePipe } from './arabictime/arabictime';
@NgModule({
	declarations: [ArabictimePipe],
	imports: [],
	exports: [ArabictimePipe]
})
export class PipesModule {}
