import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicePage } from './service';

//import { FormPage } from '../form/form';

@NgModule({
  declarations: [
    ServicePage,

  ],
  imports: [
    IonicPageModule.forChild(ServicePage),
  ],

})
export class ServicePageModule {}
