import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { FirstPage } from '../pages/first/first';
import { HomePage } from '../pages/home/home';
import { LaporanPage } from '../pages/laporan/laporan';
import { LaporanPetaniPage } from '../pages/laporan-petani/laporan-petani';
import { LoginPage } from '../pages/login/login';
import { PesananPage } from '../pages/pesanan/pesanan';
import { PesananPetaniPage } from '../pages/pesanan-petani/pesanan-petani';
import { ProfilePage } from '../pages/profile/profile';
import { ProfilePetaniPage } from '../pages/profile-petani/profile-petani';
import { RegisterPage } from '../pages/register/register';
import { SlidesPage } from '../pages/slides/slides';
import { TabsPage } from '../pages/tabs/tabs';
import { TabsPetaniPage } from '../pages/tabs-petani/tabs-petani';
import { FormPage } from '../pages/form/form';
import { ListPage } from '../pages/list/list';
import { RegisterLahanPage } from '../pages/register-lahan/register-lahan';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SearchServiceProvider } from '../providers/search-service/search-service';
import { OrderProvider } from '../providers/order/order';
import { PesananPageModule } from '../pages/pesanan/pesanan.module';

@NgModule({
  declarations: [
    MyApp,
    FirstPage,
    HomePage,
    LaporanPage,
    LoginPage,
    ProfilePage,
    SlidesPage,
    TabsPage,
    TabsPetaniPage,
    FormPage,
    ListPage,
    // PesananPage,
    RegisterPage,
    RegisterLahanPage,
    LaporanPetaniPage,
    PesananPetaniPage,
    ProfilePetaniPage
  ],
  imports: [
    BrowserModule,HttpModule,HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    PesananPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FirstPage,
    HomePage,
    LaporanPage,
    LoginPage,
    ProfilePage,
    SlidesPage,
    TabsPage,
    TabsPetaniPage,
    FormPage,
    PesananPage,
    ListPage,
    RegisterPage,
    RegisterLahanPage,
    LaporanPetaniPage,
    PesananPetaniPage,
    ProfilePetaniPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    SearchServiceProvider,
    OrderProvider
  ]
})
export class AppModule {}
