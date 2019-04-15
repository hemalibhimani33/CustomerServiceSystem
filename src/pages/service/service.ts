



import { catchError, timeInterval } from 'rxjs/operators';
import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController, Option, ActionSheetController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
 import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
// import { FormPage } from '../../pages/form/form';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderReverseResult } from '@ionic-native/native-geocoder/ngx';
import { LocationPage } from '../location/location';


@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html',

})
export class ServicePage {

  public form 			: FormGroup;
  start_date = new Date().toDateString();
  end_date = new Date().toDateString();
  start_time = new Date().toTimeString();
  location:string;
   public category: any = {};
  // location: Boolean = false;
   eventLocation: any;
   public people3: any = [];
   responseObj:any;
  id: any;
  cid: any;


  constructor(public navCtrl 		: NavController,
              public navParams 	: NavParams,
              private _FB          : FormBuilder, private alertCtrl: AlertController ,public  restProvider: RestProvider ,private geolocation: Geolocation,
             private nativeGeocoder: NativeGeocoder ,public toastController: ToastController,public actionSheetController: ActionSheetController)
  {
debugger;

this.id = navParams.get('id');
this.cid = navParams.get('cid');

    this.category = navParams.get('name');
     this.form = this._FB.group({
         start_date : ['', Validators.required],
         end_date : ['', Validators.required],
        start_time: ['', Validators.required],
        location   : ['', Validators.required],
       // eventLocation    : ['', Validators.required],
        // address     : this._FB.array([
        //    this.initAddressFields()
        // ])

     });
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
     // header: 'Albums',
      buttons: [{
        text: 'Current Location',
        icon: 'pin',
        handler: () => {
          debugger;
          console.log('Delete clicked');
          navigator.geolocation.getCurrentPosition((resp) => {

            this.responseObj = resp.coords;
            console.log(this.responseObj.latitude);
            console.log(this.responseObj.longitude);
            this.getGeoencoder(this.responseObj.latitude,this.responseObj.longitude);

          });
        }
      },
      //  {
      //   text: 'Default Location',
      //   handler: () => {
      //     this.navCtrl.push(LocationPage);
      //   }
      // },
      //   text: 'Play (open modal)',
      //   icon: 'arrow-dropright-circle',
      //   handler: () => {
      //     console.log('Play clicked');
      //   }
      // }, {
      //   text: 'Favorite',
      //   icon: 'heart',
      //   handler: () => {
      //     console.log('Favorite clicked');
      //   }
      // }, {


    {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  initAddressFields() : FormGroup
  {
     return this._FB.group({
        name 		: ['', Validators.required]
     });
  }

  addNewInputField() : void
  {
     const control = <FormArray>this.form.controls.address;
     control.push(this.initAddressFields());
  }

  removeInputField(i : number) : void
  {
     const control = <FormArray>this.form.controls.address;
     control.removeAt(i);
  }

  manage(val : any) : void
  {

    if(!this.form.valid){
      this.showPopup("error","enter valid data");
    }
    else{
    debugger;
     console.dir(val);
     var service =	{
      "start_date":this.start_date,
      "start_time":this.start_time,
      "end_date":this.end_date,
      "location":this.eventLocation,
      "categoryid":this.id ,
      "serviceid":this.cid,
           };

     debugger;
      this.restProvider.orderS(service)
      .subscribe(data => {
      debugger;
      console.log(data);
      this.showPopup("Success","order successfully.");

     // this.presentToastWithOptions("order successfully.");
     // window.location.assign('http://localhost:8100/');
      }, error => {
        debugger;
        console.log(error);
      this.showPopup("error","no order placed");
      });
    }
  }
  async presentToastWithOptions(msg) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Done'

    });
    toast.present();
  }

  // getGeolocation(){
  //   // this.showLoader();

  //   navigator.geolocation.getCurrentPosition((resp) => {

  //    this.responseObj = resp.coords;
  //    console.log(this.responseObj.latitude);
  //    console.log(this.responseObj.longitude);
  //    this.getGeoencoder(this.responseObj.latitude,this.responseObj.longitude);

  //  });
  //  }

   getGeoencoder(latitude,longitude){
     console.log(latitude);
     debugger;
     this.restProvider.currentLocation(latitude,longitude)
     .then(data => {
       this.people3 = data;
     this.eventLocation = this.people3;
     //this.location = true;
       //console.log(this.people3);
     });
   }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            // this.navCtrl.pop();
               window.location.assign('http://localhost:8100/');
              //this.navCtrl.popTo('FormPage');
          }
        }
      ]
    });
    alert.present();
  }
}

// export class ServicePage {
//   date = new Date().toDateString();
//   enddate = new Date().toDateString();
//   location: Boolean = false;
//   public form: FormGroup;


//   responseObj:any;
//   // watchLocationUpdates:any;
//   // loading:any;
//   // isWatching:boolean;

//   // //Geocoder configuration
//   // geoencoderOptions: NativeGeocoderOptions = {
//   //   useLocale: true,
//   //   maxResults: 5
//   // };


//   public people3: any = [];
//   public userLocation:any;
//   public userLocation1:any;

//   public l 	: FormGroup;
//   public category: any = {};
//   eventTime: any;
//   eventLocation: any;


//   constructor(public nav: NavController, private alertCtrl: AlertController ,public  restProvider: RestProvider ,private geolocation: Geolocation,
//     private nativeGeocoder: NativeGeocoder , private _FB : FormBuilder,public navParams: NavParams) {

//      debugger;
//      this.category = navParams.get('name');

//   }


//  public create(vname) {

//      this.nav.push('FormPage',{firstname: vname});
//   }
// submitt(event){
//   debugger;
//   console.log(this.eventLocation)
//   console.log(this.date);
//   console.log(this.eventTime);
//   console.log(this.enddate);
  // var service = {
  //   location:this.eventLocation,
  //   start_date:this.date,
  //   start_time:this.eventTime,
  //   end_date:this.enddate
  // }
  // debugger;
  // this.restProvider.orderS(service)
  // .subscribe(data => {
  //   debugger;
  //   console.log(data);
  //   this.showPopup("Success","order successfully.");
  //  }, error => {
  //    debugger;
  //  console.log(error);
  //  this.showPopup("error","no order placed");
  // });

//   //this.showPopup("Success","order successfully.");

// }

// showPopup(title, text) {
//   let alert = this.alertCtrl.create({
//     title: title,
//     subTitle: text,
//     buttons: [
//       {
//         text: 'OK',
//         handler: data => {

//             this.nav.popTo('FormPage');

//         }
//       }
//     ]
//   });
//   alert.present();
// }



// getGeolocation(){
//  // this.showLoader();

//  navigator.geolocation.getCurrentPosition((resp) => {

//   this.responseObj = resp.coords;
//   console.log(this.responseObj.latitude);
//   console.log(this.responseObj.longitude);
//   this.getGeoencoder(this.responseObj.latitude,this.responseObj.longitude);

// });
// }


// getGeoencoder(latitude,longitude){

//   console.log(latitude);
//   debugger;
//   this.restProvider.currentLocation(latitude,longitude)
//   .then(data => {
//     this.people3 = data;
//   this.eventLocation = this.people3;
//   this.location = true;
//     console.log(this.people3);

//   });


// }
// generateAddress(addressObj){
//   let obj = [];
//   let address = "";
//   for (let key in addressObj) {
//     obj.push(addressObj[key]);
//   }
//   obj.reverse();
//   for (let val in obj) {
//     if(obj[val].length)
//     address += obj[val]+', ';
//   }
// return address.slice(0, -2);
// }

// }

