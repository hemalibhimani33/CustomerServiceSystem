import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RestProvider } from '../rest/rest';
import { CookieService } from 'ngx-cookie-service';
import { AlertController, IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as firebase from 'firebase';


export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;

  }
}
@Injectable()
export class AuthService {
  currentUser: User;

  constructor(public httpClient:HttpClient, public http: HttpClient, private cookieService: CookieService) {


  }

  resetPassword(email: string) {
    debugger;
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }
  //constructor(public nav: NavController,public  restProvider: RestProvider, private cookieService: CookieService) { }
  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {

        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

//    delete(name) {
//     //document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//     document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:05 UTC; path=/;";
// };


//   public login(credentials) {
//     if (credentials.email === null || credentials.password === null) {
//       return Observable.throw("Please insert credentials");
//     } else {
//       return Observable.create(observer => {
//         // At this point make a request to your backend to make a real check!
//         let access = (credentials.password === "pass" && credentials.email === "email");
//         this.currentUser = new User('Simon', 'saimon@devdactic.com');
//         observer.next(access);
//         observer.complete();
//       });
//     }
//   }

//   public register(credentials) {
//     if (credentials.firstname === null || credentials.lastname === null || credentials.email === null || credentials.number === null || credentials.password === null || credentials.confirmpassword === null) {
//       return Observable.throw("Please insert credentials");
//     } else {
//       // At this point store the credentials to your backend!
//       return Observable.create(observer => {
//         observer.next(true);
//         observer.complete();
//       });
//     }
//   }

//   public getUserInfo() : User {
//     return this.currentUser;
//   }

//   public logout() {
//     return Observable.create(observer => {
//       this.currentUser = null;
//       observer.next(true);
//       observer.complete();
//     });
//   }
}
