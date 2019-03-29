import { catchError, timeInterval } from 'rxjs/operators';
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
  date = new Date().toDateString();

  enddate = new Date().toDateString();

  location: Boolean = false;

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
  public userLocation:any;
  public userLocation1:any;

  public l 	: FormGroup;
  public category: any = {};
  eventTime: any;
  eventLocation: any;


  constructor(public nav: NavController, private alertCtrl: AlertController ,public  restProvider: RestProvider ,private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder , private _FB : FormBuilder,public navParams: NavParams) {
     //
     debugger;
     this.category = navParams.get('name');

//console.log(this.date);
  }

  // save() {
  //   console.log(this.eventTime);   //undefined
  // }

  // timeChanged(event: any) {
  //   console.log(event);                 //undefined
  // }

 public create(vname) {

     this.nav.push('FormPage',{firstname: vname});
  }
submitt(event){
  debugger;
  //console.log(this.my.controls.p_location.value);
  console.log(this.eventLocation)
  console.log(this.date);
  console.log(this.eventTime);
  console.log(this.enddate);
  var service = {
    location:this.eventLocation,
    start_date:this.date,
    start_time:this.eventTime,
    end_date:this.enddate
  }
  debugger;
  this.restProvider.orderS(service)
  .subscribe(data => {
    debugger;
    console.log(data);
    this.showPopup("Success","order successfully.");
   }, error => {
     debugger;
   console.log(error);// Error getting the data
   this.showPopup("error","no order placed");
  });

  //this.showPopup("Success","order successfully.");

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


//geocoder method to fetch address from coordinates passed as arguments
getGeoencoder(latitude,longitude){

  //this.showLoader();
  console.log(latitude);
  debugger;
  this.restProvider.currentLocation(latitude,longitude)
  .then(data => {
    this.people3 = data;
  this.eventLocation = this.people3;
  this.location = true;
    console.log(this.people3);

   // return this.people3;
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

