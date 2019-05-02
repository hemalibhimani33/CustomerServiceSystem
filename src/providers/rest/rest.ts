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

  rootURL="http://192.168.32.56:1337/";

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

  RegisterUser(newUser)
  {
            // let headers = new Headers({ 'Content-Type': 'application/json' });
            // let options = new RequestOptions({ headers: headers });
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            debugger;
            return this.http.post(this.rootURL + 'register/create', JSON.stringify(newUser),options);
  }

  UpdateStatus(deletedBooking)
  {
            // let headers = new Headers({ 'Content-Type': 'application/json' });
            // let options = new RequestOptions({ headers: headers });
            var headers = new Headers();
            debugger;
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            deletedBooking.OrderStatus = 3;
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
         var headers = new Headers();
         headers.append('Content-Type', 'application/x-www-form-urlencoded');
         headers.append('Access-Control-Allow-Origin' , '*');
         headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
         headers.append('Accept','application/json');
         headers.append('content-type','application/json');

        if(this.data) {
          return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
        this.httpClient.get<myData>(this.rootURL + 'OrderService/orderlist')
          //.map((res:Response) => res)
          .subscribe(data => {
            debugger;
            console.log(data.location);
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
                var i:number;
                console.log(data[0].OrderStatus);
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
