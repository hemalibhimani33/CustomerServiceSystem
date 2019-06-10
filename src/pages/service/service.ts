
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
import { LoginPage } from '../login/login';
import { config } from '../variable';


@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html',

})
export class ServicePage {
  //[x: string]: any;

  public form 			: FormGroup;
  myD: String = new Date().toISOString();
  // start_date = new Date();
  // end_date = new Date();
  // start_time = new Date();
  start_date:any;
  end_date:any;
  start_time :any;
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
  data: string;
  public loginURL : string = null;
  AddressId:number;

  //myCondition : any;
  myCondition: Boolean = true;

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
          console.log();
          console.log('Delete clicked');
          this.myCondition = true;

          navigator.geolocation.getCurrentPosition((resp) => {

            this.responseObj = resp.coords;
            console.log(this.responseObj.latitude);
            console.log(this.responseObj.longitude);
            this.getGeoencoder(this.responseObj.latitude,this.responseObj.longitude);

          });
        }
      },

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
      actionSheet.addButton(

        {
          text: this.people5[i].OrderAddress,
          icon: 'pin',

          handler: () => {
            debugger;

            console.log("inside handler");
           // console.log(this.people5[i].OrderAddress);
            this.eventLocation = this.people5[i].OrderAddress;
            this.AddressId = this.people5[i].id
            this.myCondition = false;
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
  addressSave() {
    debugger;
    console.log(this.eventLocation);
    this.restProvider.SaveAddress(this.eventLocation)
    .subscribe(data => {
      debugger;
      console.log(data.addressId);
      this.AddressId = data.addressId;
       this.myCondition = false;
      this.showPopup1("Success","address added");
    }, error => {
      debugger;
    console.log(error);
    this.showPopup1("error","address already added.");
    });
  //  this.myCondition = false;

  }


  manage(val : any) : void
  {
    this.data = this.auth.getCookie("token");

    if(this.data != "")

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

    else{
      //this.showPopup("Anonymous", "login requires for order service");
      this.presentAlertConfirm1("Anonymous","login requires for order service");
    }

//     if(!this.form.valid){
//       this.showPopup1("error","enter valid data");
//     }
//     else{
//     debugger;
//      console.log(val);

//      var service =	{
//       "start_date":this.start_date,
//       "start_time":this.start_time,
//       "end_date":this.end_date,
//       "location":this.eventLocation,
//       "categoryid":this.id ,
//       "serviceid":this.cid,
//            };

//           var service1 = service;
//           debugger;


//         if(this.start_date === this.end_date)
//         {
//           console.log(this.start_time);
//           var a = this.start_time.split(':');
//           console.log(a[0] - 24);
//           var hours = (24 - a[0]);
//           var hPrice = (this.price*hours)/24;
//           this.TotalPrice = hPrice;
//           this.presentAlertConfirm("Your Price will be "+ hPrice,"Are You Sure You want to place order");
//         }
//         else{
//           const date3 = new Date(this.start_date);
//          var sDate = ((date3.getMonth() + 1) + '/' + date3.getDate() + '/' +  date3.getFullYear());
//          const date4 = new Date(this.end_date);

//           var eDate = ((date4.getMonth() + 1) + '/' + date4.getDate() + '/' +  date4.getFullYear());

//           const date1 = new Date(sDate);
//           const date2 = new Date(eDate);
//           const diffTime = Math.abs(date2.getTime() - date1.getTime());
//           const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//           console.log(diffDays);
//           console.log(diffDays*(this.price));
//           var tPrice = diffDays*(this.price);
//           this.TotalPrice = tPrice;

// // const diffTime = Math.abs(this.start_date.getTime() - this.end_date.getTime());
// // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
// // console.log(diffDays);
// this.presentAlertConfirm("Your Price will be "+ tPrice,"Are You Sure You want to place order");
//         }
//     }
  }

  async presentAlertConfirm1(title, text) {
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
        }, {
          text: 'Login',
          handler: () => {
            debugger;
            this.loginURL = (config.URL + "/#/search/service");
            this.navCtrl.push(LoginPage,{loginPageURL: this.loginURL});

          }
        }
      ]
    });

    await alert.present();
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
            //this.navCtrl.pop();
            window.location.assign(config.URL);

            console.log('Confirm Cancel: blah');
          }
        },{
          text: 'Sure',
          handler: () => {
            var service =	{
              "start_date":this.start_date,
              "start_time":this.start_time,
              "end_date":this.end_date,
              "addressid":this.AddressId,
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
            window.location.assign(config.URL);
            //  this.showPopup("Success","order successfully.");

      this.presentToastWithOptions("order successfully.");
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

   getGeoencoder(latitude,longitude){
     console.log(latitude);
     debugger;
     this.restProvider.currentLocation(latitude,longitude)
     .then(data => {
     this.people3 = data;
     this.eventLocation = this.people3;

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
               window.location.assign(config.URL);
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
