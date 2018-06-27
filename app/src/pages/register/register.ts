import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController  } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loading: any;
    email: string;
    nama: string;
    address: string;
    phone_number: number;
    password: string;
    spesialisasi: string;
    role: string;
    harga: any;
  data : any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public loadCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

signup(){
  let regData = { 
    email:this.email, 
    password:this.password,
    name:this.nama,
    address:this.address,
    phone_number:this.phone_number,
    spesialisasi:this.spesialisasi,
    harga:this.harga,
    role:"petani"
  };

  console.log(this.email,this.password);
  console.log(regData);
  this.showLoader();
  this.authService.register(regData).then((result) => {
    this.loading.dismiss();
    this.navCtrl.setRoot(LoginPage);
    console.log(result,regData);
  }, (err) => {
    this.loading.dismiss();
    this.presentToast(err);
    console.log(err);
  });
console.log(this.email,this.address)
}

showLoader() {
  this.loading = this.loadCtrl.create({
    content: 'memuat..'
  });

  this.loading.present();
}

presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom',
    dismissOnPageChange: true
  });
  
  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
}
