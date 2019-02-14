import { Component } from '@angular/core';


import { AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  //debugger;
 // name:any;
 public people2 : any;
  constructor(public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
    , public formBuilder: FormBuilder , public navParams: NavParams,public  restProvider: RestProvider , public modalCtrl: ModalController
  ) {
    debugger;
    this.loadPeople2();
  }
  loadPeople2(){
    debugger;
   this.restProvider.load2()
   .then(data => {
     debugger;
     this.people2 = data;
   });
 }
  ionViewDidLoad() {
  }

}
