import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  MyForm1: FormGroup;
  constructor(public navCtrl: NavController,   private cookieService:CookieService) {

  }

  public logout(): any{
    debugger;
    this.cookieService.delete('token');
   // this.loggedIn.next(false);
    this.navCtrl.push(LoginPage);
  }


}
