
import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {

 formdata = {
  p_surname: '',
  p_lastname:'',
  p_email: '',
  p_number:'',
  p_password: '',
  p_confirm_password: ''
};

myForm: FormGroup;

createSuccess: Boolean = false;
constructor(public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
  , public formBuilder: FormBuilder , public  restProvider: RestProvider , private httpClient:HttpClient
) {
  this.myForm = this.formBuilder.group({
      p_surname: ['', Validators.compose([Validators.maxLength(30),Validators.required])],
      p_lastname: ['', Validators.compose([Validators.maxLength(30),Validators.required])],
      // p_email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      p_email: ['', Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/)])],
      p_number: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]{10}$')])],
      // p_password: ['', [Validators.required, Validators.minLength(6)]],
      p_password: ['', Validators.compose([Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/)])],
      p_confirm_password: ['', Validators.compose([Validators.required])]
  }, {'validator': this.isMatching});
}

ionViewDidEnter(){
}

isMatching(group: FormGroup){

  console.log("password check");

  var firstPassword = group.controls['p_password'].value;
  var secondPassword = group.controls['p_confirm_password'].value;
  if((firstPassword && secondPassword) && (firstPassword != secondPassword)){
    console.log("mismatch");
    return { "pw_mismatch": true };
  } else{
    return null;
  }
}

matchPassword(group): any {
  let password = group.controls.p_password;
  let confirm = group.controls.p_confirm_password;
console.log("indise");
  // Don't kick in until user touches both fields
  if (password.pristine || confirm.pristine) {
    console.log("sd");
    return null;
  }

  // Mark group as touched so we can add invalid class easily
  group.markAsTouched();

  if (password.value === confirm.value) {
    return null;
  }
console.log("sdfdsf");
  return {
    isValid: false
  };
}

register(){
  //this.createSuccess = true;
  if(!this.myForm.valid){
    //this.createSuccess = false ;
    if(!this.myForm.controls.p_surname.valid){
      this.showPopup("failure", "Enter Valid firstname information.");
    }else if(!this.myForm.controls.p_lastname.valid){
      this.showPopup("failure", "Enter Valid lastname information.");
    }else if(!this.myForm.controls.p_email.valid){
      this.showPopup("failure", "Enter Valid email address.");
    }else if(!this.myForm.controls.p_password.valid){
      this.showPopup("failure", "Password requires one lower case letter, one upper case letter, one digit, 4-8 length, and no spaces,no special character.");
    }else if(!this.myForm.controls.p_number.valid){
      this.showPopup("failure", "Enter 10 digit mobile number.");
    }else{
      this.showPopup("failure","enter valid information");
    }
  }
  else {
   // this.createSuccess = true;
   debugger;
   console.log(this.myForm.controls.p_surname.value);
   var user =	{
      "firstname":this.myForm.controls.p_surname.value,
      "lastname":this.myForm.controls.p_lastname.value,
      "email":this.myForm.controls.p_email.value ,
      "password":this.myForm.controls.p_password.value ,
      "mobile":this.myForm.controls.p_number.value
   };
    this.restProvider.RegisterUser(user)
      .subscribe(data => {
        debugger;
        console.log(data);
        this.showPopup1("Success", "Account created.");

      }, error => {
        debugger;
      console.log(error);
      this.showPopup("failure", "already exist");
      // Error getting the data
      });
      //this.showPopup("Success", "Account created.");
      // this.nav.push('LoginPage');
      console.log(this.myForm.value);
      console.log(this.formdata);
  }

}
showPopup(title, text) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: text,
    buttons: [
      {
        text: 'OK',
        handler: data => {
           // this.nav.pop();
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
