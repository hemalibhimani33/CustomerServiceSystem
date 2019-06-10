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
 //galleryType = 'regular';
  //image: Array<string>;
  //grid: Array<Array<string>>;
  public homePage : string = null;
  private list: string[];
  private list2: string[];

public shouldShowCancel: any = [];
  constructor(private http: Http,public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
    , public formBuilder: FormBuilder , public navParams: NavParams,public  restProvider: RestProvider , public modalCtrl: ModalController)
    {

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

  doRefresh(event) {
    debugger;
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.restProvider.load()
   .then(data => {
     this.people = data;
    event.complete();
   });
     // event.target.complete();
    }, 1);
  }

  loadPeople(){

   this.restProvider.load()
   .then(data => {

     this.people = data;
   });
 }
 onClear(ev)
 {
     this.loadPeople();
    // ev.stopPropagation();
 }

 getPeople(ev: any){
  //  debugger;
   this.setFilteredItems();
   let val = ev.target.value;
   console.log("ev"+ev.data);
   console.log("value"+val);
    if(val=="")
    {
      this.onClear('');
    }
   if (val && val.trim() != '') {

      //var list1:any = [];

     /* for(let i=0;i<this.people.length;i++)
      {
         if(this.people[0])
      }*/

    var list:any = this.people.filter((person) => {
      debugger;
      console.log(person.category);
      return (person.category.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
    // var list2:any = this.people.filter((person2) => {
    //   return (person2.category.toLowerCase().indexOf(val.toLowerCase()) > -1);
    // });
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

  //   //

  //   //this.loadPeople();
  //  }



 }

 setFilteredItems() {

  this.list = this.people;
  // this.list2 = this.p.people2;

}
  public sub(id,service) {

    this.nav.push('FormPage' , {id : id, name: service});
 }

// ionViewDidLoad() {

//   this.setFilteredItems();

// }
}
