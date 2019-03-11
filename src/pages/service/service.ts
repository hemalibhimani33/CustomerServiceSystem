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
  date = new Date().toISOString();
//  time = new TimeRanges();
  enddate = new Date().toDateString();


  public people: any;
  constructor(public nav: NavController, private alertCtrl: AlertController ,public  restProvider: RestProvider ) {
     //debugger;

//console.log(this.date);
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
submitt(event){
debugger;

  console.log(this.date);
 // console.log(this.time);

  console.log(this.enddate);

  this.showPopup("Success", "Account created.");

}

showPopup(title, text) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: text,
    buttons: [
      {
        text: 'OK',
        handler: data => {

            this.nav.pop();

        }
      }
    ]
  });
  alert.present();
}

}

