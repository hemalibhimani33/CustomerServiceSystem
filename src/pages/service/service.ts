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
   setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

}

