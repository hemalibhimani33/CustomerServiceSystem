import { Component } from '@angular/core';
import { FormPage } from '../../pages/form/form';
import { AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public nav: NavController , private auth: AuthService, private alertCtrl: AlertController
    , public formBuilder: FormBuilder , public navParams: NavParams,public  restProvider: RestProvider , public modalCtrl: ModalController)
    {
      debugger;
      console.log('hemali');

  }
  public signup() {
    debugger;
        this.nav.push(RegisterPage);
     }
}
