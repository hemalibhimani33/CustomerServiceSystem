import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  booking: Boolean = false;
  public user1: any = {};
  clicked: boolean;



  constructor(public navCtrl: NavController,  private auth: AuthService,  private cookieService:CookieService) {
    debugger;
    this.user1 = this.auth.getCookie("token");
    console.log("asad");
    if(this.user1 != ""){
      this.booking = true;
    }else{
    this.booking = false;
    }
  }


  public cnl() {
    debugger;
console.log("delete");
 }
}
