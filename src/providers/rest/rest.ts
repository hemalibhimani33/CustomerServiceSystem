import * as CryptoJS from 'crypto-js';
import { Injectable, OnInit, OnDestroy, Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { NavController,Platform, AlertController, IonicPage } from 'ionic-angular';
import { Headers, RequestOptions , Http, Response } from '@angular/http';
import { AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';

//import { environment } from '../../../environments/environment';
//import { CryptoJS } from 'crypto-js';
//import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';
//import { Common } from '../../shared/common';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/do';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { ServicePage } from '../../pages/service/service';
import { stringify } from '@angular/compiler/src/util';


//export type HandleError = <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;
const options = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
//const options = {Headers, HttpParams, responseType: 'text' as 'text'};

 export interface myData {

  token: string
  email: string

  formatted : string


  }

  // export interface myData1{
  //   components:string
  //   country:string
  // }

@Injectable()

export class RestProvider {
   data: Observable<any>;
   public people: any;
   results: any[];
  constructor(public httpClient:HttpClient, public http: HttpClient) {


   }




  //ngOnDestroy(): void {}

  LoginUser(email,password){

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
   headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
   headers.append('Accept','application/json');
   headers.append('content-type','application/json');

        var newUser =	{
           "email":email ,
           "password":password
         };



    return this.http.post<myData>('http://192.168.32.56:1337/login/login', JSON.stringify(newUser),options);
   // .map((res:any) => res.json())
    // .subscribe((data) => {
    //   console.log(data);
    //  },
    // (error) => {console.log(error)});
            // .subscribe(
            //     data => console.log(data),
            //     error => console.log(error),
            // );



  }

  currentLocation(latitude,longitude)
  {
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   headers.append('Access-Control-Allow-Origin' , '*');
  //  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  //  headers.append('Accept','application/json');
  //  headers.append('content-type','application/json');

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
            debugger;
            this.results = data['results'];
              console.log(this.results[0].formatted);
              resolve(this.results[0].formatted);
             });
      });

        // return this.http.post<myData>('https://api.opencagedata.com/geocode/v1/json?q='+latitude+'+'+longitude+'&key=7a55f6bc13be4c81b469ff079305d330', JSON.stringify(newUser1));

// return this.http.get<myData>('https://api.opencagedata.com/geocode/v1/json?q=23.2006975+72.6342312&key=7a55f6bc13be4c81b469ff079305d330')
// .subscribe(
//   data => {
//     debugger;
//     console.log(data.formatted);

//   }
//   ,
//   error =>  {

//    console.log(error);
//   }
// );
  }


  // ValidateUser(email,password):Observable<any>{
  //   let loginParameter=new HttpParams()
  //               .set('email',email)
  //               .set('password',password)
  //   return this.httpClient.get<any>("/api/User/Signin/",{
  //         params:loginParameter
  //     });
  // }


  RegisterUser(firstname,lastname,email,password,number){
    // let headers = new Headers({ 'Content-Type': 'application/json' });
        //  let options = new RequestOptions({ headers: headers });
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

     // password = CryptoJS.MD5(password).toString();
          var newUser =	{
                  "firstname":firstname ,
                  "lastname":lastname,
                   "email":email ,
                   "password":password ,
                  "number":number
                 };



          return this.http.post('http://192.168.32.56:1337/register/create', JSON.stringify(newUser),options)
                     //.map(this.extractData)
                     //.catch(this.handleErrorObservable);

                     .subscribe(data => {
                               console.log(data['_body']);
                              }, error => {
                              console.log(error);// Error getting the data
                             });
      }
      load2(id) {

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

          this.httpClient.get('http://192.168.32.56:1337/Servicecategory/subcategory/' + (id))
            .map((res:Response) => res)
            .subscribe(data => {

                resolve(data);
               });
        });
      }

  load() {

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

      this.httpClient.get('http://192.168.32.56:1337/service/view')
        .map((res:Response) => res)
        .subscribe(data => {

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

  //getApiUrl : string = "https://192.168.32.56:1337/service/index";

// getPost() {
//
// var headers = new Headers();
//         headers.append('Content-Type', 'application/x-www-form-urlencoded');
//
//     return  this.http.get(this.getApiUrl)
//            // .do((res : Response ) => console.log(res.json())
//           // .map((res : Response ) => res.json())
//             //.catch(error => console.log(error)))
//             .map((res:Response) => res)
//         .subscribe(data => {
//
//           //  resolve(data);
//        });
// }

// getPost(): Observable <any> {
//
//   console.log("Here");
//   const headerDict = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Access-Control-Allow-Headers': 'Content-Type',
//   }
//   var headers = new Headers();
//   var requestOptions = new RequestOptions({headers:headers});
//   // const requestOptions = {
//   //   headers: new Headers(headerDict),

//   // };
//  //headers.append('Content-Type', 'application/x-www-form-urlencoded');

// return this.http.get('https://192.168.32.56:1337/service/index')
// .map(this.extractData)
// .catch(this.handleErrorObservable);

// }
}
