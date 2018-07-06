import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the LaporanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
    
    email: string;
    nama: string;
    phone_number: number;
    password: string;
    data : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  save(){
    let regData = { 
    email:this.email, 
    password:this.password,
    name:this.nama,
    phone_number:this.phone_number,
  }
  console.log(this.email,this.password);
  console.log(regData);
  this.navCtrl.setRoot(ProfilePage);
  }

}
