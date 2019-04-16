import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../providers/auth-service/auth-service';
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
  public allpeople3: any = [];
  cnlOrder: boolean = false;
  found: boolean;
  deletedBooking: any;

  constructor(public navCtrl: NavController,public toastController: ToastController, public navParams: NavParams,public  restProvider: RestProvider ,public alertController: AlertController,private alertCtrl: AlertController,  private auth: AuthService,  private cookieService:CookieService) {
    debugger;

    this.user1 = this.auth.getCookie("token");
    if(this.user1 != ""){
      debugger;
      this.booking = true;
      this.loadStatus();
    }else{
      this.booking = false;
    }
  }
  onContextChange(value): void {
    var i = 0;
    debugger;
    console.log(value);
    this.eventFlag = Status[value];
    console.log(this.eventFlag);
    debugger;
    if(value === "ALL"){
      debugger;
      this.loadStatus();
    }else{
   this.people3 = this.allpeople3.filter(person3 => person3.OrderStatus === this.eventFlag);
  }
    // var list : any = this.people3.filter((person3) =>
    // {
      // for (var i = 0; i < this.people3.length; i++){
      //   if((this.people3[i].OrderStatus) == this.eventFlag){
      //     console.log(this.people3[i]);
      //   }else{
      //     console.log("out");
      //   }
      // }
    // });
  }

  async presentToastWithOptions(msg) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Ok'

    });
    toast.present();
  }

  public forbooking() {
  this.navCtrl.push(LoginPage);
  }

  loadStatus(){
  debugger;
    this.restProvider.MyBooking()
    .then(data => {
      this.people3 = data;
      this.allpeople3 = this.people3;
    });
  }

  public cnl(person3) {
    debugger;
    this.presentAlertConfirm("Cancel Order","Are You Sure You want to cancel order");
    this.deletedBooking = person3;
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
      },{
        text: 'Sure',
        handler: () => {
          console.log('Confirm Okay');
          let index = this.people3.indexOf(this.deletedBooking);
          debugger;
          if(index > -1){
            this.people3.splice(index, 1);
          }
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
