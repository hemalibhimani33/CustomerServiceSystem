import { Component } from '@angular/core';
import { FormPage } from '../../pages/form/form';
import { AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { config } from '../variable';



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public registerPage = RegisterPage;
  clicked: Boolean = false;
  public data: any = {};


  private loggedIn = new BehaviorSubject<boolean>(this.getUserAvailability());

  constructor(public loadingController: LoadingController , private cookieService:CookieService, public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
    , public formBuilder: FormBuilder , public navParams: NavParams,public  restProvider: RestProvider , public modalCtrl: ModalController)
    {
      debugger;

      this.data = this.auth.getCookie("token");
      console.log("asad");
      if(this.data != ""){
        this.clicked = true;
      }else{
      this.clicked = false;

      }

    }

    ionViewWillEnter(){
      this.data = this.auth.getCookie("token");
      console.log("asad");
      if(this.data != ""){
        this.clicked = true;
      }else{
      this.clicked = false;

      }

    }

  private getUserAvailability():boolean{
    if(this.auth.getCookie("token")!=""){
      return true;
  }else{
    return false;
  }
  }
   async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
     // message: 'Please wait...',
     // translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
  public logout(): any{
   // this.clicked = false;
   // this.ionViewWillEnter();

    //this.cookieService.delete('token');
    // this.data = this.auth.getCookie("token");
    // console.log(this.data);
    // this.auth.delete('token');
    //     console.log(this.data);
    setTimeout(() => {
      this.presentLoadingWithOptions();
      // this.put = true;
    }, 1);
    this.data = this.auth.getCookie("token");
    this.auth.setCookie('token',this.data,-1);    //localStorage.removeItem("token");
   // this.data = this.auth.getCookie("token");

   // console.log(this.data);
   window.location.assign(config.URL);

        this.clicked = false;
   // this.loggedIn.next(false);
  // this.clicked = false;
   // this.nav.push(ContactPage);
    //this.router.navigate(['/contact']);
  }

  // doRefresh(refresher) {
  //   //console.log('Begin async operation', refresher);
  //   // this.data = this.auth.getCookie("token");
  //   // console.log("asad");
  //   // if(this.data != ""){
  //   //   this.clicked = true;
  //   // }else{
  //   // this.clicked = false;

  //   // }
  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     this.data = this.auth.getCookie("token");
  //     console.log("asad");
  //     if(this.data != ""){
  //       this.clicked = true;
  //     }else{
  //     this.clicked = false;

  //     }
  //     refresher.complete();
  //   }, 2000);
  // }
  doRefresh(event) {
    debugger;
    console.log('Begin async operation');

    setTimeout(() => {
      this.data = this.auth.getCookie("token");
      console.log("asad");
      if(this.data != ""){
        this.clicked = true;
      }else{
      this.clicked = false;
      }
      event.complete();
    }, 2000);
  }


     public loginn(): any{
debugger;
  //  this.clicked = true;
      this.nav.push(LoginPage);


     //console.log( localStorage.getItem('clicked'));

       }


}
