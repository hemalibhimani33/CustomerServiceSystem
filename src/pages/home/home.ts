import { Component } from '@angular/core';

import { FormPage } from '../../pages/form/form';
import { AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { environment } from '../../local/local';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public people: any;
  galleryType = 'regular';
  image: Array<string>;
  grid: Array<Array<string>>;
  public homePage : string = null;
  searchTerm: string = '';

  constructor(public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
    , public formBuilder: FormBuilder , public navParams: NavParams,public  restProvider: RestProvider , public modalCtrl: ModalController)
    {
    debugger;
    //this.image = this.navParams.get('http://192.168.32.56:1337/service/view');
    //this.ionViewLoaded();
   // this.ionViewLoaded();
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
 getPeople(ev: any){
   debugger;
   this.loadPeople();
   let serVal = ev.target.value;
   if(serVal && serVal.trim()!="")
   {
     this.people = this.people.filter((person)=>{return (person.service.toLowercase().indexOf(serVal.toLowerCase())) > -1;
    })
   }
 }

 setFilteredItems() {

  this.people = this.restProvider.filterItems(this.searchTerm);

}
  public sub(id) {
debugger;
    this.nav.push('FormPage' , {id : id});
 }
//  public sub() {
//   debugger;
//       this.nav.push(FormPage);
//    }
ionViewDidLoad() {

  this.setFilteredItems();

}
}
