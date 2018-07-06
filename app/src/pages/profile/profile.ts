import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logout(){
    this.authProvider.logout();
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }

  editprofile(){
    this.navCtrl.setRoot(EditProfilePage);
  }

}
