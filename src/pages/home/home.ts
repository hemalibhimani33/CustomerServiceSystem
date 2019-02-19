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
  galleryType = 'regular';
  image: Array<string>;
  grid: Array<Array<string>>;

  constructor(public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
    , public formBuilder: FormBuilder , public navParams: NavParams,public  restProvider: RestProvider , public modalCtrl: ModalController)
    {
    debugger;
    //this.image = this.navParams.get('http://192.168.32.56:1337/service/view');
    //this.ionViewLoaded();
   // this.ionViewLoaded();
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
ionViewLoaded() {
debugger;
  let rowNum = 0; //counter to iterate over the rows in the grid

  for (let i = 0; i < 5; i+=2) { //iterate images

    this.grid[rowNum] = Array(2); //declare two elements per row

    if (this.image[i]) { //check file URI exists
      this.grid[rowNum][0] = this.people[i] //insert image
    }

    if (this.image[i+1]) { //repeat for the second image
      this.grid[rowNum][1] = this.people[i]
    }

    rowNum++; //go on to the next row
  }

}

}
