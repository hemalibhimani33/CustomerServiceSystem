import * as CryptoJS from 'crypto-js';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
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


//export type HandleError = <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;
const options = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
//const options = {Headers, HttpParams, responseType: 'text' as 'text'};

interface myData {

  token: string
  email: string
  }

@Injectable()

export class RestProvider {
   data: Observable<any>;
   public people: any;
  constructor(public httpClient:HttpClient, public http: HttpClient) {
   // debugger;
   // this.people = [{service: 'person.service'}]

   }

//    filterItems(searchTerm){

//     return this.people.filter((person) => {
//         return person.service.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
//     });

// }


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

         debugger;

    return this.http.post<myData>('http://192.168.32.56:1337/register/login', JSON.stringify(newUser),options);
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



  // ValidateUser(email,password):Observable<any>{
  //   let loginParameter=new HttpParams()
  //               .set('email',email)
  //               .set('password',password)
  //   return this.httpClient.get<any>("/api/User/Signin/",{
  //         params:loginParameter
  //     });
  // }


  RegisterUser(username,email,password,number){
    // let headers = new Headers({ 'Content-Type': 'application/json' });
        //  let options = new RequestOptions({ headers: headers });
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        debugger;
      password = CryptoJS.MD5(password).toString();
          var newUser =	{
                  "username":username ,
                   "email":email ,
                   "password":password ,
                  "number":number
                 };

                 debugger;

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
        debugger;
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
            debugger;
          this.httpClient.get('http://192.168.32.56:1337/Servicecategory/subcategory/' + (id))
            .map((res:Response) => res)
            .subscribe(data => {
              debugger;
                resolve(data);
               });
        });
      }

  load() {
    debugger;
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
        debugger;
      this.httpClient.get('http://192.168.32.56:1337/service/view')
        .map((res:Response) => res)
        .subscribe(data => {
          debugger;
            resolve(data);
           });
    });
  }
  private extractData(res: Response) {
    debugger;
    let body = res.json();
          return body || {};
      }
private handleErrorObservable (error: Response | any) {
        debugger;
    console.error(error.message || error);
    return Observable.throw(error.message || error);
      }

  //getApiUrl : string = "https://192.168.32.56:1337/service/index";

// getPost() {
// debugger;
// var headers = new Headers();
//         headers.append('Content-Type', 'application/x-www-form-urlencoded');
//         debugger;
//     return  this.http.get(this.getApiUrl)
//            // .do((res : Response ) => console.log(res.json())
//           // .map((res : Response ) => res.json())
//             //.catch(error => console.log(error)))
//             .map((res:Response) => res)
//         .subscribe(data => {
//           debugger;
//           //  resolve(data);
//        });
// }

// getPost(): Observable <any> {
//   debugger;
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
