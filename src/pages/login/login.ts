import { HomePage } from './../home/home';
import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController, Navbar, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
import { ServicePage } from '../service/service';
import { ContactPage } from '../contact/contact';
import { myData } from './../../providers/rest/rest'
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
//import { myData } from '../../providers/rest/rest';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LocationPage } from '../location/location';
import { ResetPage } from '../reset/reset';
import { config } from '../variable';
import { AboutPage } from '../about/about';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
  public submitted: boolean = false;

  formdata = {
    p_email: '',
    p_password: '',
  };

MyForm: FormGroup;
createSuccess: Boolean = false;
put: Boolean = false;
data: string;
//clicked: Boolean = true;
//mydata: myData ;
mydata : myData[] = [];
v : ContactPage;

@ViewChild(Navbar) navBar: Navbar;
  public loginU : string = null;
  ap: any;


//public loggedIn = new BehaviorSubject<boolean>(this.getUserAvailability());
constructor(
  public loadingController: LoadingController,private ng4LoadingSpinnerService:Ng4LoadingSpinnerService,public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
 , public navParams: NavParams, public formBuilder: FormBuilder , public  restProvider: RestProvider,    private cookieService:CookieService,

) {
 // AboutPage ap : AboutPage;


  // this.MyForm = this.formBuilder.group({
  //   p_email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
  //   //password_ctrl: this.formBuilder.group({
  //   p_password: ['', Validators.compose([Validators.required])],
  // }, );
debugger;
  this.loginU = navParams.get('loginPageURL');
  console.log(this.loginU);
}
resetPassword() {
  debugger;
  this.nav.push(LocationPage);
}
public createAccount() {
  this.nav.push('RegisterPage');
}

ngOnInit() {
  this.MyForm = this.formBuilder.group(
    {
    email: ['', Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/)])],
   //password: ['', [Validators.required, Validators.minLength(6)]]
    password: ['', Validators.compose([Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/)])]

    }
    );
  }

  get f() { return this.MyForm.controls; }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
     // message: 'Please wait...',
      //translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  login(event){
      debugger;
      this.submitted = true;
      if (this.MyForm.invalid) {
      return;
      }
      //this.put = true;
      const email = this.MyForm.controls.email.value
      const password = this.MyForm.controls.password.value
      var loginuser1 =	{
        "email":email ,
        "password":password
      };
      this.restProvider.LoginUser(loginuser1)
     .subscribe(
      data => {
        // setTimeout(() => {
        //   this.presentLoadingWithOptions();
        //   // this.put = true;
        // }, 1);
        debugger;
        console.log(data.token);
        this.auth.setCookie('token',data.token,1);
        this.data = this.auth.getCookie("token");
        // this.showPopup("success", "login successfully");
        debugger;
      // window.location.assign(config.URL);
      // document.location.href = 'this.nav.pop' ;
      //document.onkeydown = function() { window.location.reload; };
     // window.location.reload;

     if (this.loginU == (config.URL + "/#/search/service"))
     {
      this.showPopup1("Success", "login successfully.");
     // this.ap.OnInit1();

     }else{
      setTimeout(() => {
          this.presentLoadingWithOptions();
          // this.put = true;
        }, 1);
      window.location.assign(config.URL);

     }
   // this.showPopup1("Success", "login successfully.");
      },
      error => {
        console.log(error);
        this.showPopup("failure", "Invalid User");}
        );
      }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.pop();
            }
          }
        }
      ]
    });
    alert.present();
  }

  showPopup1(title, text) {
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
