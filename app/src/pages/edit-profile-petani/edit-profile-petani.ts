import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePetaniPage } from '../profile-petani/profile-petani';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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
    address: string;
    spesialisasi: string;
    harga: number;
    no_rekening: number;
    data : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthServiceProvider) {
    this.data = navParams.get('data');
    console.log(this.data);
    this.email = this.data.email;
    this.nama = this.data.name;
    this.phone_number = this.data.phone_number;
    this.address = this.data.address;
    this.no_rekening = this.data.no_rekening;
    this.spesialisasi = this.data.spesialisasi;
    this.harga = this.data.harga;
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePetaniPage');
  }

  save(){
    let editData = { 
    email:this.email,
    name:this.nama,
    phone_number:this.phone_number,
    no_rekening:this.no_rekening,
    address:this.address,
    spesialisasi:this.spesialisasi,
    harga:this.harga
  }
  this.authProvider.editProfilePetani(editData);
  console.log(editData);
  this.navCtrl.pop();
  }

}

