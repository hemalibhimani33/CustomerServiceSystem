import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { LoginPage } from '../login/login';


/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {
  otpVerification: Boolean = false;
  generateOTP: Boolean = false;
  OTP: any;
  NewPasswordForm : FormGroup;
  formdata1 = {
    p_password: '',
    p_confirm_password: ''
  };
  mobileNumber: any;
  sendToken: any;


  constructor(private alertCtrl: AlertController,public formBuilder: FormBuilder,public  restProvider: RestProvider,public navCtrl: NavController, public navParams: NavParams) {

    this.mobileNumber = navParams.get('number');
    this.sendToken = navParams.get('token');


    this.NewPasswordForm = this.formBuilder.group({
      p_password: ['', Validators.compose([Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/)])],
      p_confirm_password: ['', Validators.compose([Validators.required])]
  }, {'validator': this.isMatching});
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }

  OTPResend() {
    debugger;
    this.restProvider.Resendotp(this.mobileNumber)
    .subscribe(data => {
      debugger;
      console.log(data);
      this.showPopup("Success","otp sent");
    }, error => {
      debugger;
    console.log(error);
    this.showPopup("error","error");
    });

  }

  changePassword() {
    debugger;
    if(!this.NewPasswordForm.valid){
      //this.createSuccess = false ;
      if(!this.NewPasswordForm.controls.p_password.valid){
        this.showPopup("failure", "Enter valid password");
      }else{
        this.showPopup("failure","password do not match");
      }
    }
    else {
     // this.createSuccess = true;
     debugger;
     this.restProvider.NewPassword(this.NewPasswordForm.controls.p_password.value,this.sendToken)
     .subscribe(data => {
      debugger;
      console.log(data);
      this.showPopup1("Success","password changed");
    }, error => {
      debugger;
    console.log(error);
    this.showPopup("error","error");
    });
    // this.showPopup("Success","password changed");

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
             // this.navCtrl.pop();
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
              //this.navCtrl.pop();
              this.navCtrl.popTo(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }



  OTPverification() {
    debugger;
    console.log(this.OTP);
    console.log("varified");
    this.restProvider.GenerateOTP(this.mobileNumber,this.OTP)
    .subscribe(
      data => {
        debugger;
        console.log(data);
        if(data.is_success == true){
          this.otpVerification = true;
        }else{
          this.showPopup("failure", "Invalid User");
        }
      },
      error => {
        debugger;
        console.log(error);
        this.showPopup("failure", "Invalid User");
        }
        );

    //this.otpVerification = true;
  }

  // GO() {
  //   debugger;
  //   console.log("varified");
  //   this.restProvider.GenerateOTP()
  //   .subscribe(data => {
  //     debugger;
  //     console.log(data);
  //     //this.generateOTP = true;
  //   }, error => {
  //     debugger;
  //   console.log(error);
  //   });
  //   this.generateOTP = true;
  // }
}
