import { catchError } from 'rxjs/operators';
import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController, Option } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
 import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
// import { FormPage } from '../../pages/form/form';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderReverseResult } from '@ionic-native/native-geocoder/ngx';

@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html',

})


export class ServicePage {
  date = new Date().toISOString();
//  time = new TimeRanges();
  enddate = new Date().toDateString();


  responseObj:any;
  watchLocationUpdates:any;
  loading:any;
  isWatching:boolean;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };


  public people3: any = [];
  public p:any;
  public l 	: FormGroup;
  public category: any = {};



  constructor(public nav: NavController, private alertCtrl: AlertController ,public  restProvider: RestProvider ,private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder , private _FB : FormBuilder,public navParams: NavParams) {
     //
     this.category = navParams.get('name');

//console.log(this.date);
  }

 public create(vname) {

     this.nav.push('FormPage',{firstname: vname});
  }
submitt(event){


  console.log(this.date);
 // console.log(this.time);

  console.log(this.enddate);

  this.showPopup("Success", "Account created.");

}

showPopup(title, text) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: text,
    buttons: [
      {
        text: 'OK',
        handler: data => {

            this.nav.popTo('FormPage');

        }
      }
    ]
  });
  alert.present();
}



getGeolocation(){
 // this.showLoader();

 navigator.geolocation.getCurrentPosition((resp) => {

  this.responseObj = resp.coords;
  console.log(this.responseObj.latitude);
  console.log(this.responseObj.longitude);
  this.getGeoencoder(this.responseObj.latitude,this.responseObj.longitude);

});
}
  // this.geolocation.getCurrentPosition().then((resp) => {
  //   this.responseObj = resp.coords;
  //  // this.hideLoader();
  //   this.getGeoencoder(this.responseObj.latitude,this.responseObj.longitude);

  //  }).catch((error) => {
  //    alert('Error getting location'+ JSON.stringify(error));
  //   // this.hideLoader();
  //  });
//}

//geocoder method to fetch address from coordinates passed as arguments
getGeoencoder(latitude,longitude){

  //this.showLoader();
  console.log(latitude);
  debugger;
  this.restProvider.currentLocation(latitude,longitude)
  .then(data => {
    debugger;
    this.people3 = data;
// let p = this.people3;
    console.log(this.people3);
    return this.people3;
  });

//   .subscribe(
//     data => {
//       debugger;
//       console.log(data.country);

//     }
//     ,
//     error =>  {
//      console.log(error);
//     }
// );

  // return new Promise((resolve, reject) =>
  // {
  //     debugger;
  //     this.nativeGeocoder.reverseGeocode(latitude, longitude,this.geoencoderOptions)
  //    .then((result : NativeGeocoderReverseResult[]) =>
  //    {
  //     console.log(JSON.stringify(result[0]));
  //      // let str : string   = `The reverseGeocode address is ${result.street} in ${result.countryCode}`;
  //       resolve(result);
  //    })
  //    .catch((error: any) =>
  //    {
  //       console.log(error);
  //       reject(error);
  //    });
  //    debugger;
  //    console.log('above working');
  // });
  // this.nativeGeocoder.reverseGeocode(latitude,longitude)
  // .then((result: NativeGeocoderReverseResult[]) =>{

  //  console.log(JSON.stringify(result[0]));
  //    this.responseObj = result[0];
  // })

  // .catch((error: any) => console.log(error));


  // this.nativeGeocoder.reverseGeocode(latitude, longitude)
  // .then((result: NativeGeocoderReverseResult[]) => {
  //
  //   console.log(result);
  //  // this.responseObj.address = this.generateAddress(result[0]);
  //  // this.hideLoader();
  // })
  // .catch((error: any) => {
  //   alert('Error getting location'+ JSON.stringify(error));
  //  // this.hideLoader();
  // });
}
generateAddress(addressObj){
  let obj = [];
  let address = "";
  for (let key in addressObj) {
    obj.push(addressObj[key]);
  }
  obj.reverse();
  for (let val in obj) {
    if(obj[val].length)
    address += obj[val]+', ';
  }
return address.slice(0, -2);
}

}

