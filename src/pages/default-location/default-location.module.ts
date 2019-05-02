import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefaultLocationPage } from './default-location';

@NgModule({
  declarations: [
    DefaultLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(DefaultLocationPage),
  ],
})
export class DefaultLocationPageModule {}
