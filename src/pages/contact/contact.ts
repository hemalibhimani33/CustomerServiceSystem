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
import { v } from '../variable';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public registerPage = RegisterPage;
  clicked: Boolean = false;
  public data: any = {};


  private loggedIn = new BehaviorSubject<boolean>(this.getUserAvailability());

  constructor(private cookieService:CookieService, public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
    , public formBuilder: FormBuilder , public navParams: NavParams,public  restProvider: RestProvider , public modalCtrl: ModalController)
    {
      debugger;
      this.data = this.auth.getCookie("token");
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
  public logout(): any{
    debugger;
    this.data = this.auth.getCookie("token");
    this.auth.setCookie('token',this.data,-1);    //localStorage.removeItem("token");

        this.clicked = false;

  }

 public loginn(): any{
      debugger;
      this.nav.push(LoginPage);
     console.log( localStorage.getItem('clicked'));
       }


}
