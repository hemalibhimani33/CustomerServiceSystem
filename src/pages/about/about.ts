import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../providers/auth-service/auth-service';
import { StreamPriorityOptions } from 'http2';
import { Status } from './../enums'
import { RestProvider } from  './../../providers/rest/rest';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
  booking: Boolean = false;
  public user1: any = {};
  clicked: boolean;
  eventFlag: any;
  courseValue:any;
  public people3: any = [];



  constructor(public navCtrl: NavController, public navParams: NavParams,public  restProvider: RestProvider ,public alertController: AlertController,private alertCtrl: AlertController,  private auth: AuthService,  private cookieService:CookieService) {
    debugger;
    this.user1 = this.auth.getCookie("token");
    console.log("asad");
    if(this.user1 != ""){
      this.booking = true;
      debugger;
      // this.eventFlag = Status[0];
      // console.log(Status[0]);
      // console.log(this.courseValue);
      this.loadStatus();
    }else{
    this.booking = false;
    }
  }

  public forbooking() {
  this.navCtrl.push(LoginPage);
  }

  loadStatus(){
debugger;
    this.restProvider.MyBooking()
    .then(data => {
      this.people3 = data;
      debugger;
    });
  }




  public cnl() {
    debugger;
//this.showPopup("Cancel Order", "r u sure u want to cancel order");
this.presentAlertConfirm("Cancel Order","r u sure u want to cancel order");

 }

 async presentAlertConfirm(title, text) {
  const alert = await this.alertController.create({
    title: title,
    subTitle: text,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Sure',
        handler: () => {
          console.log('Confirm Okay');
        }
      }
    ]
  });
  await alert.present();
}

 showPopup(title, text) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: text,
    buttons: [
      {
        text: 'OK',
        handler: data => {
            this.navCtrl.popToRoot();
        }
      }
    ]
  });
  alert.present();
}

}
