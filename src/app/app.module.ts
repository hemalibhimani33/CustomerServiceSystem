 import { AuthService } from './../providers/auth-service/auth-service';
// import { BrowserModule } from '@angular/platform-browser';
// import { ErrorHandler, NgModule } from '@angular/core';
// import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';
 import { HttpModule } from '@angular/http';
 import { AlertController, IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';



// import { MyApp } from './app.component';
 import { HttpClientModule } from  '@angular/common/http';
 import { RestProvider } from '../providers/rest/rest';
// import { TabsPage } from '../pages/tab/tab';
// import { LoginPage } from '../pages/login/login';
// import { RegisterPage } from '../pages/register/register';
// import { ServicePage } from '../pages/service/service';
// import {IonicPageModule} from 'ionic-angular';



// @NgModule({
//   declarations: [
//     MyApp,
//     //ServicePage,
//     //LoginPage,
//     //RegisterPage,
//     //TabsPage
//   ],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     HttpModule,
//     IonicModule.forRoot(MyApp),
//     //IonicPageModule.forChild(TabsPage),

//   ],
//   bootstrap: [IonicApp],
//   entryComponents: [
//     MyApp,
//     //ServicePage,
//     //LoginPage,
//     //RegisterPage,
//     //TabsPage
//   ],
//   providers: [
//     StatusBar,
//     SplashScreen,
//     {provide: ErrorHandler, useClass: IonicErrorHandler},
//     AuthService,
//     RestProvider,

//   ]
// })
// export class AppModule {}



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

//import { SearchPipe } from '../pipes/search/search';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    RegisterPage,
    LoginPage,
    //FormPage,
    TabsPage,
    ServicePage,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    RegisterPage,
    LoginPage,

    //FormPage,
    TabsPage,
    ServicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CookieService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    RestProvider,
  ]
})
export class AppModule {}

