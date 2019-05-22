import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from  './../../providers/rest/rest';
import { ServicePage } from '../service/service';


/**
 * Generated class for the DefaultLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-default-location',
  templateUrl: 'default-location.html',
})
export class DefaultLocationPage {
  public people6 : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public  restProvider: RestProvider) {
debugger;
    this.loadA();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DefaultLocationPage');
  }

  loadA() {
    this.restProvider.loadAddress()
    .then(data => {
      this.people6 = data;
    });

  }

  setA(dA) {
    debugger;
     this.navCtrl.getPrevious().data.thing1 = dA;
     this.navCtrl.pop();

    //this.navCtrl.popTo('ServicePage');

  }

}
