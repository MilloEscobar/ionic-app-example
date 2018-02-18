import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoaderComponent } from './loader/loader';
@NgModule({
	declarations: [LoaderComponent],
	imports: [
		 IonicPageModule.forChild(LoaderComponent),
	],
	exports: [LoaderComponent]
})
export class ComponentsModule {}
