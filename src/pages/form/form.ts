import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  debugger;
  character;

  // constructor( public platform: Platform,
  //   public params: NavParams,
  //   public viewCtrl: ViewController
  // ) {
  //   var characters = [
  //     {
  //       name: 'Gollum',
  //     },
  //     {
  //       name: 'Frodo',
  //     },
  //     {
  //       name: 'Samwise Gamgee',
  //     }
  //   ];
  //   this.character = characters[this.params.get('charNum')];
  // }

public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }


}
