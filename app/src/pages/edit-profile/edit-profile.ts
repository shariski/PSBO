import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
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
    address: string;
    ukuran_lahan: number;
    data : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthServiceProvider) {
    this.data = navParams.get('data');
    console.log(this.data);
    this.email = this.data.email;
    this.nama = this.data.name;
    this.phone_number = this.data.phone_number;
    this.address = this.data.address;
    this.ukuran_lahan = this.data.ukuran_lahan;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  save(){
    let editData = { 
    email:this.email,
    name:this.nama,
    address:this.address,
    phone_number:this.phone_number,
    ukuran_lahan:this.ukuran_lahan
  }
  this.authProvider.editProfileLahan(editData);
  console.log("data edit",editData);
  
  this.navCtrl.pop();
  }

}
