import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { FormPage } from '../../pages/form/form';


@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html',
  providers: [ RestProvider, ]
})


export class ServicePage {

  public people: any;
  constructor(public nav: NavController ,public  restProvider: RestProvider ) {
     //debugger;
   // this.loadPeople();
   }

   loadPeople(){
     //debugger;
    this.restProvider.load()
    .then(data => {
      //debugger;
      this.people = data;
    });
  }
 public create(vname) {

     this.nav.push('FormPage',{firstname: vname});
  }


}

