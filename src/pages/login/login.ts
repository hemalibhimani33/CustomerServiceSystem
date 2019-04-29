import { HomePage } from './../home/home';
import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController, Navbar} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
import { ServicePage } from '../service/service';
import { ContactPage } from '../contact/contact';
import { myData } from './../../providers/rest/rest'
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { v } from '@angular/core/src/render3';
//import { myData } from '../../providers/rest/rest';
//import { v } from '../variable';
//import { v } from '@angular/core/src/render3';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


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

//public loggedIn = new BehaviorSubject<boolean>(this.getUserAvailability());
constructor(public loadingController: LoadingController,private ng4LoadingSpinnerService:Ng4LoadingSpinnerService,public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
  , public formBuilder: FormBuilder , public  restProvider: RestProvider,    private cookieService:CookieService,

) {

 //
  // this.MyForm = this.formBuilder.group({
  //   p_email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
  //   //password_ctrl: this.formBuilder.group({
  //   p_password: ['', Validators.compose([Validators.required])],

  // }, );

}
resetPassword(email: string) {
  debugger;
  this.auth.resetPassword(email)

  console.log(email);
}

public createAccount() {
  this.nav.push('RegisterPage');
}

ngOnInit() {
  this.MyForm = this.formBuilder.group(
    {
    email: ['', Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/)])],
    password: ['', [Validators.required, Validators.minLength(6)]]
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
        setTimeout(() => {
          this.presentLoadingWithOptions();
          // this.put = true;
        }, 1);
        debugger;
        console.log(data.token);
        this.auth.setCookie('token',data.token,1);
        this.data = this.auth.getCookie("token");
        // this.showPopup("success", "login successfully");
        debugger;
        window.location.assign('http://localhost:8100/');
      },
      error => {
        console.log(error);
        this.showPopup("failure", "invalid information");}
        );
      }

// login(event){
//   //this.createSuccess = true;

//     if(!this.MyForm.valid){
//       this.createSuccess = false ;

//       if(!this.MyForm.controls.p_email.valid){
//       this.showPopup("failure", "invalid email");
//       }
//     }
//     else {
//      // this.createSuccess = true;
//      // this.showPopup("Success", "login.");

//   const email = this.MyForm.controls.p_email.value
//   const password = this.MyForm.controls.p_password.value

//    this.restProvider.LoginUser(email, password)
//    .subscribe(
//     data => {
//     console.log(data.token);
//     this.auth.setCookie('token',data.token,1);
//     this.data = this.auth.getCookie("token");
//     if(this.data != ""){
//       this.put = true;
//      // this.ng4LoadingSpinnerService.show();

//       // setTimeout(() => {
//       //   this.put = true;
//       // }, 1);
//     //  this.ng4LoadingSpinnerService.show();

//     //this.nav.setRoot(HomePage);
//       //this.nav.pop();
//      // this.showPopup("success", "login successfully");
//     }
//     this.nav.setRoot(HomePage);
//     },
//     error =>  {
//      console.log(error);
//      this.showPopup("failure", "invalid information");}
// );

//     }
//   }

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
}
