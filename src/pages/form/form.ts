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
 public id: any = {};
 private list: string[];
  constructor(public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
    , public formBuilder: FormBuilder , public navParams: NavParams,public  restProvider: RestProvider , public modalCtrl: ModalController
  ) {
    debugger;
    this.id = navParams.get('id');
    debugger;
    this.loadPeople2();
  }
  loadPeople2(){
    debugger;
   this.restProvider.load2(this.id)
   .then(data => {
     debugger;
     this.people2 = data;
   });
 }
 get(ev: any){
  debugger;
  this.setFilteredItems2();
  let val = ev.target.value;

  if (val && val.trim() != '') {

     var list1:any = [];

    /* for(let i=0;i<this.people.length;i++)
     {
        if(this.people[0])
     }*/

   var list:any = this.people2.filter((person) => {
     return (person.category.toLowerCase().indexOf(val.toLowerCase()) > -1);
   });
   this.people2 = list ;
 //  console.log(typeof(list));
   console.log(this.people2);
 }
}
setFilteredItems2() {

  this.list = this.people2;

}

  ionViewDidLoad() {
  }

}
