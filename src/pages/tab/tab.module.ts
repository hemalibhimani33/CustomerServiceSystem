import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tab';
import { FormPage } from '../form/form';

@NgModule({
  declarations: [
    TabsPage,

  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
  ],

})
export class ServicePageModule {}
