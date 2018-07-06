import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePetaniPage } from '../profile-petani/profile-petani';

/**
 * Generated class for the LaporanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-profile-petani',
  templateUrl: 'edit-profile-petani.html',
})
export class EditProfilePetaniPage {
    email: string;
    nama: string;
    phone_number: number;
    password: string;
    data : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePetaniPage');
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
  this.navCtrl.setRoot(ProfilePetaniPage);
  }

}

