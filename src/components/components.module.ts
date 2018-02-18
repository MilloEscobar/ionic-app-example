import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoaderComponent } from './loader/loader';

@NgModule({
	imports: [
		IonicPageModule.forChild(LoaderComponent),
	],
	declarations: [
		LoaderComponent,
	],
	exports: [
		LoaderComponent,
	]
})
export class ComponentsModule {}
