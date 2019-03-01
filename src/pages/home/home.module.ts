import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { SearchPipe } from '../../pipes/search/search';

@NgModule({
  declarations: [
    HomePage,
    SearchPipe

  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
