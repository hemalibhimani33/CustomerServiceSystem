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
 //galleryType = 'regular';
  //image: Array<string>;
  //grid: Array<Array<string>>;
  public homePage : string = null;
  private list: string[];
public shouldShowCancel: any = [];

  constructor(private http: Http,public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
    , public formBuilder: FormBuilder , public navParams: NavParams,public  restProvider: RestProvider , public modalCtrl: ModalController)
    {
    debugger;
    //this.image = this.navParams.get('http://192.168.32.56:1337/service/view');
    //this.ionViewLoaded();
   // this.ionViewLoaded();
   this.homePage = 'http://localhost:8100/';
    this.loadPeople();


    // this.people.push({
    //   image : this.people.image,
    //   service : this.people.service
    // });

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
   this.setFilteredItems();
   let val = ev.target.value;

   if (val && val.trim() != '') {

      //var list1:any = [];

     /* for(let i=0;i<this.people.length;i++)
      {
         if(this.people[0])
      }*/

    var list:any = this.people.filter((person) => {
      return (person.service.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
    this.people = list ;
  //  console.log(typeof(list));
    console.log(this.people);
  }


  //  if(serVal && serVal.trim()!="")
  //  {
  //   console.log(this.people);
  //    this.list = this.people.filter((person)=>
  //    {
  //      console.log(person);
  //      return (person.service.toLowerCase().indexOf(serVal.toLowerCase())) > -1;

  //   });

  //   console.log(list);

  //   //debugger;

  //   //this.loadPeople();
  //  }



 }

 setFilteredItems() {

  this.list = this.people;

}
  public sub(id) {
debugger;
    this.nav.push('FormPage' , {id : id});
 }

// ionViewDidLoad() {

//   this.setFilteredItems();

// }
}
