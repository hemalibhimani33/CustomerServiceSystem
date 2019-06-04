import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController, Navbar, NavParams} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
import { CookieService } from 'ngx-cookie-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ResetPage } from '../reset/reset';

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage implements OnInit{
  emailForm: FormGroup;
  put: Boolean = false;
  public submitted2: boolean = false;


  formdata = {
   // p_email: '',
    p_number:''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingController: LoadingController,private ng4LoadingSpinnerService:Ng4LoadingSpinnerService,public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
    , public formBuilder: FormBuilder , public  restProvider: RestProvider,    private cookieService:CookieService)
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }
  ngOnInit() {
    this.emailForm = this.formBuilder.group(
      {
     // email: ['', Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/)])],
      number: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]{10}$')])],

      }
      );
    }

  get f() { return this.emailForm.controls; }

  resetP() {
    debugger;
     this.submitted2 = true;
    if (this.emailForm.invalid) {
    return;
   // this.showPopup("failure", "Enter Valid email address");
    }
    //this.put = true;
    //const email = this.emailForm.controls.email.value
    const number = this.emailForm.controls.number.value;
    console.log(number);
    this.restProvider.ResetPasswordToken(number)
    .subscribe(
      data => {
        debugger;
        console.log(data);
        console.log(data.token);
       // this.auth.setCookie('token',data.token,1);
        this.nav.push(ResetPage,{number: number,token:data.token});
      },
      error => {
        debugger;
        console.log(error);
        this.showPopup("failure", "Invalid User");
        }
        );
    //this.nav.push(ResetPage);
  }
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.submitted2) {
              this.nav.pop();
            }
          }
        }
      ]
    });
    alert.present();
  }
}


