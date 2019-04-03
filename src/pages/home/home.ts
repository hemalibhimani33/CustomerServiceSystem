//import { FormPage } from './../form/form';
import { Component } from '@angular/core';

import { FormPage } from '../../pages/form/form';
import { AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { environment } from '../../local/local';
import { Headers, RequestOptions , Http, Response } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public people: any = [];
  public homePage : string = null;
  private list: string[];
  private list2: string[];

public shouldShowCancel: any = [];
  constructor(private http: Http,public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
    , public formBuilder: FormBuilder , public navParams: NavParams,public  restProvider: RestProvider , public modalCtrl: ModalController)
    {
    debugger;

   this.homePage = 'http://localhost:8100/';
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
 onClear(ev)
 {
     this.loadPeople();
     ev.stopPropagation();
 }

 getPeople(ev: any){
   debugger;
   this.setFilteredItems();
   let val = ev.target.value;

   if (val && val.trim() != '') {

    var list:any = this.people.filter((person) => {
      return (person.service.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
    // var list2:any = this.people.filter((person2) => {
    //   return (person2.category.toLowerCase().indexOf(val.toLowerCase()) > -1);
    // });
    this.people = list ;
  //  console.log(typeof(list));
    console.log(this.people);
  }


 }

 setFilteredItems() {

  this.list = this.people;
  // this.list2 = this.p.people2;

}
  public sub(id,service) {
debugger;
    this.nav.push('FormPage' , {id : id, name: service});
 }

}
