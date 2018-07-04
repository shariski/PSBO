import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { TabsPetaniPage } from '../tabs-petani/tabs-petani';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RegisterPage } from '../register/register';
import { RegisterLahanPage } from '../register-lahan/register-lahan';
import { AdminPage } from '../admin/admin';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild ('username') uname ;
  @ViewChild ('password') password ;

  token: string;
  loading: any;
  loginData = {
    email: '',
    password: ''
  };
  data : any;
  dataUser : any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService: AuthServiceProvider,
    public loadCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.showLoader();    
    this.authService.login(this.loginData).then((result) => {
      this.loading.dismiss();
      this.data = result;
      localStorage.setItem('token', this.data.token);
      console.log("ini user token",this.data.token)
      console.log("ini user role",this.data.role)
      if (this.data.role == "petani") {
        this.navCtrl.setRoot(TabsPetaniPage);
      } else if (this.data.role == "lahan") {
        this.navCtrl.setRoot(TabsPage);
      } else if (this.data.role == "admin") {
        // this.navCtrl.setRoot('TabsAdminPage');   //tabs/home admin belum dibuat
      }
  }, (err) => {
    this.loading.dismiss();
    this.presentToast(err);
    console.log(err);
  });;
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

  signUpPetani(){
    this.navCtrl.push(RegisterPage);
  }

  signUpLahan(){
    this.navCtrl.push(RegisterLahanPage);
  }

  masukAdmin(){
    this.navCtrl.setRoot(AdminPage);
  }
}
