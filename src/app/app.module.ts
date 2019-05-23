 import { LocationPage } from './../pages/location/location';
 import { AuthService } from './../providers/auth-service/auth-service';
// import { BrowserModule } from '@angular/platform-browser';
// import { ErrorHandler, NgModule } from '@angular/core';
 import { HttpModule } from '@angular/http';
//import { AlertController, IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
// import { MyApp } from './app.component';
 import { HttpClientModule } from  '@angular/common/http';
 import { RestProvider } from '../providers/rest/rest';
// import { TabsPage } from '../pages/tab/tab';
// import { LoginPage } from '../pages/login/login';
// import { RegisterPage } from '../pages/register/register';
// import { ServicePage } from '../pages/service/service';
// import {IonicPageModule} from 'ionic-angular';

import { NgModule, ErrorHandler } from '@angular/core';
import {Injectable, Injector} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FormPage } from '../pages/form/form';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { ServicePage } from '../pages/service/service';
import { CookieService } from 'ngx-cookie-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ResetPage } from '../pages/reset/reset';
import { DefaultLocationPage } from '../pages/default-location/default-location';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    //RegisterPage,
    LoginPage,
    LocationPage,
    ResetPage,
    DefaultLocationPage,
    //FormPage,
    TabsPage,
    //ServicePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
   // RegisterPage,
    LoginPage,
    LocationPage,
    ResetPage,
    DefaultLocationPage,
    //FormPage,
    TabsPage,
   // ServicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CookieService,
    Geolocation,
    NativeGeocoder,
    EmailComposer,
    Ng4LoadingSpinnerService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    RestProvider,
  ]
})
export class AppModule {}

