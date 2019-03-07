import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
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

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})
export class LoginPage {

  formdata = {
    p_email: '',
    p_password: '',
  };
MyForm: FormGroup;
createSuccess: Boolean = false;
data: string;
//clicked: Boolean = true;
//mydata: myData ;
mydata : myData[] = [];
v : ContactPage;

//public loggedIn = new BehaviorSubject<boolean>(this.getUserAvailability());

constructor(public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
  , public formBuilder: FormBuilder , public  restProvider: RestProvider,    private cookieService:CookieService,

) {

 // debugger;
  this.MyForm = this.formBuilder.group({


    p_email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    //password_ctrl: this.formBuilder.group({
    p_password: ['', Validators.compose([Validators.required])],

  }, );

}
// clicked: v;
ionViewDidEnter(){

}
// ngOnInit() {
//   this.MyForm = this.formBuilder.group(
//     {
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     }
//   );
// }

public createAccount() {
  this.nav.push('RegisterPage');
}

// get isLoggedIn() {
//   return this.loggedIn.asObservable();
// }

// public getUserAvailability():boolean{
//     if(this.auth.getCookie("token")!=""){
//         return true;
//     }else{
//       return false;
//     }

// }
login(event){
  //this.createSuccess = true;

    if(!this.MyForm.valid){
      this.createSuccess = false ;

      if(!this.MyForm.controls.p_email.valid){
      this.showPopup("failure", "invalid email");
      }
    }
    else {
      this.createSuccess = true;
     // this.showPopup("Success", "login.");
      debugger;

  const email = this.MyForm.controls.p_email.value
  const password = this.MyForm.controls.p_password.value
  debugger;
   this.restProvider.LoginUser(email, password)
   .subscribe(
    data => {
      console.log(data);
      console.log(data.token);

     this.auth.setCookie('token',data.token,1);
    // debugger;
    this.data = this.auth.getCookie("token");
     // this.cookieService.set('token',JSON.stringify(this.mydata));

      debugger;
       //this.loggedIn.next(true);
    if(this.data != ""){
      setTimeout(() => {
        window.location.reload();
      }, 0.1);
      //this.ng4LoadingSpinnerService.hide();


      //this.nav.pop();
     // this.showPopup("success", "login successfully");

    }
    // window.location.reload();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 0.1);
    },

    error =>  {
     console.log(error);
    // debugger;
     //this.loggedIn.next(true);
    // this.clicked = true;
     this.showPopup("failure", "invalid information");}
     //this.nav.push(ContactPage);}
     // this.showPopup("failure", "invalid information");}


);



      debugger;
     // this.nav.push('ServicePage');

    }
   // this.nav.push('ServicePage');


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


}
