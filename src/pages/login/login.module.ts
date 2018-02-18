import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

@NgModule({
	imports: [
		IonicPageModule.forChild(LoginPage),
	],
	declarations: [
		LoginPage,
	], 
	exports:[
		LoginPage,
	]
})
export class LoginPageModule {
	
}
