import { Component } from '@angular/core';

import { FormPage } from '../../pages/form/form';
import { AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public people: any;

  //images: Array<string>;
  grid: Array<Array<string>>;

  constructor(public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
    , public formBuilder: FormBuilder , public navParams: NavParams,public  restProvider: RestProvider , public modalCtrl: ModalController)
    {
    debugger;
    this.loadPeople();
  }
  loadPeople(){
    debugger;
   this.restProvider.load()
   .then(data => {
     debugger;
     this.people = data;
   });
 }
  public sub(id) {
debugger;
    this.nav.push('FormPage' , {id : id});
 }
//  public sub() {
//   debugger;
//       this.nav.push(FormPage);
//    }
// ionViewLoaded() {

//   let rowNum = 0; //counter to iterate over the rows in the grid

//   for (let i = 0; i < this.images.length; i+=2) { //iterate images

//     this.grid[rowNum] = Array(2); //declare two elements per row

//     if (this.images[i]) { //check file URI exists
//       this.grid[rowNum][0] = this.images[i] //insert image
//     }

//     if (this.images[i+1]) { //repeat for the second image
//       this.grid[rowNum][1] = this.images[i+1]
//     }

//     rowNum++; //go on to the next row
//   }

// }

}
