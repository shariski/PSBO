import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pesanan-petani',
  templateUrl: 'pesanan-petani.html',
})
export class PesananPetaniPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesananPetaniPage');
  }

  terima(){
    
  }

  tolak(){

  }

}
