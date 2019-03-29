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
  //
 // name:any;
 public people2 : any;
 public id: any = {};
 private list: string[];
 public shouldShowCancel: any = [];
public service: any = {};
public data: any = {};


  constructor(public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
    , public formBuilder: FormBuilder , public navParams: NavParams,public  restProvider: RestProvider , public modalCtrl: ModalController
  ) {

    this.id = navParams.get('id');
    this.service = navParams.get('name');
    console.log(this.service);


    this.loadPeople2();
  }

orderService(category){
  this.data = this.auth.getCookie("token");
  if(this.data != ""){
    debugger;
    this.nav.push('ServicePage', {name: category});

  }else{
    this.showPopup("failure", "login requires for order service");
  }

}


  loadPeople2(){

   this.restProvider.load2(this.id)
   .then(data => {

     this.people2 = data;
   });
 }
 onClear(ev)
 {
     this.loadPeople2();
     ev.stopPropagation();
 }
 get(ev: any){

  this.setFilteredItems2();
  let val = ev.target.value;

  if (val && val.trim() != '') {

     var list1:any = [];



   var list:any = this.people2.filter((person2) => {
     return (person2.category.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {

              this.nav.popToRoot();

          }
        }
      ]
    });
    alert.present();
  }
}
