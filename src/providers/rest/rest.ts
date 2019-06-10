import { myData } from './rest';
import { Injectable, OnInit, OnDestroy, Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { NavController, Platform, AlertController, IonicPage, Option } from 'ionic-angular';
import { Headers, RequestOptions , Http, Response } from '@angular/http';
// import { AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { AuthService } from '../auth-service/auth-service';
import { config } from '../../pages/variable';

const options = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

 export interface myData {
  token: string
  email: string
  formatted : string
  id:number
  OrderStatus:number
  category: string
  location: string
  is_success: boolean
  addressId:number
  OrderAddress:string
  }

@Injectable()

export class RestProvider {
   data: Observable<any>;
   public people: any;
   results: any[];
   public data1: any = {};
   eventFlag: any;

  constructor(public httpClient:HttpClient, public http: HttpClient,private auth: AuthService) {
   }

  //rootURL="http://192.168.32.75:1337/";
  rootURL=config.apiURL;

  LoginUser(loginuser)
  {
    console.log(this.rootURL);
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
    debugger;
    return this.http.post<myData>(this.rootURL + 'login/login', JSON.stringify(loginuser),options);
  }

  currentLocation(latitude,longitude)
  {
        var newUser1 =	{
           "latitude":latitude ,
           "longitude":longitude
         };
        if (this.data) {
          return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
            this.httpClient.get('https://api.opencagedata.com/geocode/v1/json?q=' + newUser1.latitude + "+" + newUser1.longitude + '&key=7a55f6bc13be4c81b469ff079305d330')
            .map((res:Response) => res)
            .subscribe(data => {
            this.results = data['results'];
            console.log(this.results[0].formatted);
            resolve(this.results[0].formatted);
            });
      });
  }



  orderS(services)
  {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        headers.append('Access-Control-Allow-Headers', 'Content-Type, authorization');
        headers.append('Accept','application/json');
        headers.append('content-type','application/json');
        debugger;
        this.data1 = this.auth.getCookie("token");
        const option = {
          headers: {
            'authorization': this.data1,
          }
        };

       debugger;
       return this.http.post<myData>(this.rootURL + 'OrderService/PlaceOrder', JSON.stringify(services),option);
                         //.map(this.extractData)
                         //.catch(this.handleErrorObservable);
                                //   .subscribe(data => {
                                //    console.log(data['_body']);
                                //   }, error => {
                                //   console.log(error);// Error getting the data
                                //  });
  }

  SaveAddress(address)
  {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        headers.append('Access-Control-Allow-Headers', 'Content-Type, authorization');
        headers.append('Accept','application/json');
        headers.append('content-type','application/json');
        debugger;
        this.data1 = this.auth.getCookie("token");
        const option = {
          headers: {
            'authorization': this.data1,
          }
        };
        var UserLocation =	{
          "location":address
        };

       debugger;
       return this.http.post<myData>(this.rootURL + 'OrderService/address', JSON.stringify(UserLocation),option);
                         //.map(this.extractData)
                         //.catch(this.handleErrorObservable);
                                //   .subscribe(data => {
                                //    console.log(data['_body']);
                                //   }, error => {
                                //   console.log(error);// Error getting the data
                                //  });
  }

  RegisterUser(newUser)
  {
            // let headers = new Headers({ 'Content-Type': 'application/json' });
            // let options = new RequestOptions({ headers: headers });
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            debugger;
            return this.http.post(this.rootURL + 'register/create', JSON.stringify(newUser),options);
  }

  ResetPasswordToken(number)
  {
            // let headers = new Headers({ 'Content-Type': 'application/json' });
            // let options = new RequestOptions({ headers: headers });
            debugger;
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            debugger;
            var usermail =	{
              "mobile": number
            };
            return this.http.post<myData>(this.rootURL + 'ForgotPassword/SendOTP', JSON.stringify(usermail),options);
  }

  Resendotp(number){

     // let headers = new Headers({ 'Content-Type': 'application/json' });
            // let options = new RequestOptions({ headers: headers });
            debugger;
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            debugger;
            var usernumber =	{
              "mobile": number
            };
            return this.http.post<myData>(this.rootURL + 'SmsService/ResendOTP', JSON.stringify(usernumber),options);

  }

  GenerateOTP(number,otp)
  {
            // let headers = new Headers({ 'Content-Type': 'application/json' });
            // let options = new RequestOptions({ headers: headers });
            debugger;
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            debugger;
            this.data1 = this.auth.getCookie("token");
            const option3 = {
              headers: {
                'authorization': this.data1,
              }
            };
            var userotp =	{
              "mobile":number,
              "OTP": otp
            };
            return this.http.post<myData>(this.rootURL + 'ForgotPassword/VerifyOTP', JSON.stringify(userotp));
  }
  NewPassword(password,token)
  {
            // let headers = new Headers({ 'Content-Type': 'application/json' });
            // let options = new RequestOptions({ headers: headers });
            debugger;
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            debugger;
            this.data1 = this.auth.getCookie("token");
            const option4 = {
              headers: {
                'authorization': token,
              }
            };
            var userpassword =	{
              "password":password,

            };

            return this.http.put(this.rootURL + 'ForgotPassword/update/',JSON.stringify(userpassword), option4);
            // .subscribe(data => {
            //   debugger;
            //   console.log(data);
            // }, error => {
            //   debugger;
            // console.log(error);
            // });
          }

  UpdateStatus(deletedBooking)
  {
            // let headers = new Headers({ 'Content-Type': 'application/json' });
            // let options = new RequestOptions({ headers: headers });
            var headers = new Headers();
            debugger;
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            deletedBooking.orderstatus = 3;
            console.log(deletedBooking);
            debugger;
            return this.http.put(this.rootURL +'OrderService/update/', JSON.stringify(deletedBooking),options)
            .subscribe(data => {
              debugger;
              console.log(data);
            }, error => {
              debugger;
            console.log(error);
            });
   }

  load2(id)
  {
         var headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded');
         headers.append('Access-Control-Allow-Origin' , '*');
         headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
         headers.append('Accept','application/json');
         headers.append('content-type','application/json');

          if(this.data){
            return Promise.resolve(this.data);
          }
          return new Promise(resolve => {
          this.httpClient.get(this.rootURL +'Service/subservice/' + (id))
            .map((res:Response) => res)
            .subscribe(data => {
                resolve(data);
               });
        });
  }

  loadAddress()
  {
    debugger;
         var headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded');
         headers.append('Access-Control-Allow-Origin' , '*');
         headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
         headers.append('Accept','application/json');
         headers.append('content-type','application/json');


         this.data1 = this.auth.getCookie("token");
         const option7 = {
           headers: {
             'authorization': this.data1,
           }
         };
        if(this.data) {
          return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
        this.httpClient.get<myData>(this.rootURL + 'OrderService/findById',option7)
          .subscribe(data => {
            debugger;
            console.log(data.OrderAddress);
            resolve(data);
            });
      });
  }

  MyBooking()
  {
          debugger;
          var headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('Access-Control-Allow-Origin' , '*');
          headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
          headers.append('Accept','application/json');
          headers.append('content-type','application/json');
          this.data1 = this.auth.getCookie("token");

          const option = {
            headers: {
              'authorization': this.data1,
            }
          };
          if(this.data) {
              return Promise.resolve(this.data);
            }
            return new Promise(resolve => {
            this.httpClient.get<myData>(this.rootURL + 'booking/bookingStatus',option)
              //.map((res:Response) => res)
              .subscribe(data => {
                debugger;
                console.log(data);
                console.log(data.category);
                resolve(data);
                });
          });
  }

  load()
  {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');
      if (this.data) {
          return Promise.resolve(this.data);
        }
        return new Promise(resolve => {

        this.httpClient.get<myData>(this.rootURL +'category/view')
          //.map((res:Response) => res)
          .subscribe(data => {
            debugger;
            console.log(data);
            console.log(data.id);
            resolve(data);
            });
      });
  }

  private extractData(res: Response) {
      let body = res.json();
      return body || {};
      }
  private handleErrorObservable (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
      }
}
