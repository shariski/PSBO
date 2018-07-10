import { Component } from '@angular/core';
import { App, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
  data:any;
  loading:any;

  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthServiceProvider, public loadCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  ionViewWillEnter(){
    this.authProvider.getData().then((result) => {
      this.data = result[0];
      console.log("data profil",this.data);
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logout(){
    this.authProvider.logout();
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }

  editprofile(data){
    this.navCtrl.push(EditProfilePage, {data: data});
  }

  gantiPassword(){
    this.navCtrl.push('UbahPasswordPage');
  }

}
