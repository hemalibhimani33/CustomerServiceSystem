
import { catchError, timeInterval } from 'rxjs/operators';
import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController, Option, ActionSheetController, ToastController, DateTime } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { RestProvider } from  './../../providers/rest/rest';
 import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
// import { FormPage } from '../../pages/form/form';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderReverseResult } from '@ionic-native/native-geocoder/ngx';
import { LocationPage } from '../location/location';
import { DefaultLocationPage } from '../default-location/default-location';
import { storage } from 'firebase';


@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html',

})
export class ServicePage {
  //[x: string]: any;

  public form 			: FormGroup;
  myD: String = new Date().toISOString();
  start_date = new Date();
  end_date = new Date();
  start_time = new Date();
  location:string;
   public category: any = {};
  // location: Boolean = false;
   eventLocation: any;
   public people3: any = [];
   public people5: any = [];
  diff:number;
   responseObj:any;
  id: any;
  cid: any;
  price:any;
  TotalPrice: any;
  service:any;
  defaultA: any;
  thing1: any;



  constructor(public navCtrl 		: NavController,
              public navParams 	: NavParams,
              public alertController: AlertController,
              private auth: AuthService,
              private _FB          : FormBuilder, private alertCtrl: AlertController ,public  restProvider: RestProvider ,private geolocation: Geolocation,
             private nativeGeocoder: NativeGeocoder ,public toastController: ToastController,public actionSheetController: ActionSheetController)
  {
debugger;

this.id = navParams.get('id');
this.cid = navParams.get('cid');
this.price = navParams.get('priceToservice');
console.log(this.price);

    this.category = navParams.get('name');
    this.service = navParams.get('service');
    debugger;
    this.restProvider.loadAddress()
          .then(data => {
            this.people5 = data;
          });

     this.form = this._FB.group({
        start_date : ['', Validators.required],
        end_date : ['', Validators.required],
        start_time : ['', Validators.required],
        location   : ['', Validators.required],
       // eventLocation    : ['', Validators.required],
        // address     : this._FB.array([
        //    this.initAddressFields()
        // ])
     });
  }
  public ionViewWillEnter() {
    this.thing1 = this.navParams.get('thing1')|| null;
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
      // {
      //   text: 'default Address',
      //   icon: 'pin',
      //   handler: () => {
      //     debugger;
      //     //this.auth.setCookie('defaultAddress',this.eventLocation,1);
      //     this.navCtrl.push(DefaultLocationPage);
      //     // this.restProvider.loadAddress()
      //     // .then(data => {
      //     //   this.people6 = data;
      //     // });
      //   }
      // },


    {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    for (let i = 0; i < this.people5.length; i++) {
      actionSheet.addButton({
          text: this.people5[i].location,
          icon: 'pin',
          handler: () => {
            debugger;
            this.eventLocation = this.people5[i].location;

            //this.auth.setCookie('defaultAddress',this.eventLocation,1);
           // this.navCtrl.push(DefaultLocationPage);
            // this.restProvider.loadAddress()
            // .then(data => {
            //   this.people6 = data;
            // });
          }
      })
  }

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
      this.showPopup1("error","enter valid data");
    }
    else{
    debugger;
     console.log(val);

     var service =	{
      "start_date":this.start_date,
      "start_time":this.start_time,
      "end_date":this.end_date,
      "location":this.eventLocation,
      "categoryid":this.id ,
      "serviceid":this.cid,
           };

          var service1 = service;
          debugger;


        if(this.start_date === this.end_date)
        {
          console.log(this.start_time);
          var a = this.start_time.split(':');
          console.log(a[0] - 24);
          var hours = (24 - a[0]);
          var hPrice = (this.price*hours)/24;
          this.TotalPrice = hPrice;
          this.presentAlertConfirm("Your Price will be "+ hPrice,"Are You Sure You want to place order");
        }
        else{
          const date3 = new Date(this.start_date);
         var sDate = ((date3.getMonth() + 1) + '/' + date3.getDate() + '/' +  date3.getFullYear());
         const date4 = new Date(this.end_date);

          var eDate = ((date4.getMonth() + 1) + '/' + date4.getDate() + '/' +  date4.getFullYear());

          const date1 = new Date(sDate);
          const date2 = new Date(eDate);
          const diffTime = Math.abs(date2.getTime() - date1.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          console.log(diffDays);
          console.log(diffDays*(this.price));
          var tPrice = diffDays*(this.price);
          this.TotalPrice = tPrice;

// const diffTime = Math.abs(this.start_date.getTime() - this.end_date.getTime());
// const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
// console.log(diffDays);
this.presentAlertConfirm("Your Price will be "+ tPrice,"Are You Sure You want to place order");
        }
    }
  }

  async presentAlertConfirm(title, text) {
    const alert = await this.alertController.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },{
          text: 'Sure',
          handler: () => {
            var service =	{
              "start_date":this.start_date,
              "start_time":this.start_time,
              "end_date":this.end_date,
              "location":this.eventLocation,
              "categoryid":this.id ,
              "serviceid":this.cid,
              "totalamount":this.TotalPrice,
              "category_name":this.service,
              "service_name":this.category
                   };
            debugger;
            console.log('Confirm Okay');
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
      ]
    });
    await alert.present();
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


  showPopup1(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
             console.log("invalid data");
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

