import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { FormPage } from '../../pages/form/form';
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


  constructor(public nav: NavController,  private alertCtrl: AlertController ,public  restProvider: RestProvider ,private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder ) {
     //debugger;

//console.log(this.date);
  }


 public create(vname) {

     this.nav.push('FormPage',{firstname: vname});
  }
submitt(event){
debugger;

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

            this.nav.pop();

        }
      }
    ]
  });
  alert.present();
}

getGeolocation(){
  // this.showLoader();
  debugger;

 // navigator.geolocation.getCurrentPosition(function(position) {
 // // var responseObj = position.coords;
 //       console.log(position.coords.latitude);
 //       console.log(position.coords.longitude);
 //      const la = position.coords.latitude;


 //      // this.getGeoencoder(position.coords.latitude,position.coords.longitude);
 //      //this.getGeoencoder(this.la,this.la);
 // });

 // this.getGeoencoder(this.la,this.la);


 navigator.geolocation.getCurrentPosition((resp) => {
   debugger;
   this.responseObj = resp.coords;
   console.log(this.responseObj.latitude);
   console.log(this.responseObj.longitude);
   this.getGeoencoder(this.responseObj.latitude,this.responseObj.longitude);

 });
   // this.geolocation.getCurrentPosition().then((resp) => {
   //   this.responseObj = resp.coords;
   //  // this.hideLoader();
   //   this.getGeoencoder(this.responseObj.latitude,this.responseObj.longitude);

   //  }).catch((error) => {
   //    alert('Error getting location'+ JSON.stringify(error));
   //   // this.hideLoader();
   //  });
 }

 //geocoder method to fetch address from coordinates passed as arguments
 getGeoencoder(latitude,longitude){

  //this.showLoader();
   debugger;
   console.log(latitude);
   this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
   .then((result: NativeGeocoderReverseResult[]) => {
     debugger;
     console.log(this.responseObj.address);
     this.responseObj.address = this.generateAddress(result[0]);
    // this.hideLoader();
   })
   .catch((error: any) => {
     alert('Error getting location'+ JSON.stringify(error));
    // this.hideLoader();
   });


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

