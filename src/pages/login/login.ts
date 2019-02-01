import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';

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
constructor(public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
  , public formBuilder: FormBuilder , public  restProvider: RestProvider
) {
  this.MyForm = this.formBuilder.group({


    p_email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    //password_ctrl: this.formBuilder.group({
    p_password: ['', Validators.compose([Validators.required])],

  }, );

}
isMatching(group: FormGroup){

}
ionViewDidEnter(){

}
public createAccount() {
  this.nav.push('RegisterPage');
}
login(){
  //this.createSuccess = true;

    if(!this.MyForm.valid){
      this.createSuccess = false ;
      error => {
        this.showPopup("Error",error);
      }
    }
    else {
      this.createSuccess = true;
      //this.showPopup("Success", "login.");
      //debugger;
     // this.restProvider.LoginUser(this.MyForm.controls.p_email.value,this.MyForm.controls.p_password.value)
      this.nav.push('ServicePage');
      console.log(this.MyForm.value);
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
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }


}
