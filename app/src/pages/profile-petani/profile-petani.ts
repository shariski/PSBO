import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { EditProfilePetaniPage } from '../edit-profile-petani/edit-profile-petani';

@Component({
  selector: 'page-profile-petani',
  templateUrl: 'profile-petani.html',
})
export class ProfilePetaniPage {

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
    this.navCtrl.setRoot(EditProfilePetaniPage)
    
  }

}
