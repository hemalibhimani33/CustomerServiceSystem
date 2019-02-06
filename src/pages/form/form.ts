import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ServicePage } from '../service/service';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  debugger;
  name:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,public formBuilder: FormBuilder
  ) {
    debugger;
    // console.log('Navigation Parameter : '+navParams);
     this.name = navParams.get('firstname');
  }

public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }
  ionViewDidLoad() {
  }

}
