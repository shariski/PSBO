import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the UbahPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ubah-password',
  templateUrl: 'ubah-password.html',
})
export class UbahPasswordPage {
  password_lama: any;
  password_baru: any;
  password_ulang: any;
  // data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthServiceProvider) {
    // this.data = navParams.get('data');
    // console.log('data di edit pass', this.data);
  }

  save(){
    let editData = {
      password_lama: this.password_lama,
      password_baru: this.password_baru
    }
    if(this.password_baru!=this.password_ulang){
      console.log("password baru tidak match");
    } else {
      this.authProvider.editPassword(editData).then((result) => {
        console.log('password berhasil diubah');
        this.navCtrl.pop();
      }, (err) => {
        console.log(err);
      });
      // this.authProvider.editPassword(editData);
      console.log(editData);      
      // this.navCtrl.pop();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UbahPasswordPage');
  }

}
