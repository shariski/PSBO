import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the HasilPencarianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hasil-pencarian',
  templateUrl: 'hasil-pencarian.html',
})
export class HasilPencarianPage {
  datas: any;
  dataOrder: any;
  hargaTotal: any;
  harga: number;
  order: any;
  dataUser: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider
  ) {
    this.datas = navParams.get('data');
    console.log("data petani", this.datas);
    this.dataOrder = navParams.get('dataOrder');
    console.log("data order",this.dataOrder);
  }

  pesan(dataPetani){
    this.navCtrl.push('DetailTransaksiPage',{dataPetani: dataPetani, dataOrder: this.dataOrder});
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HasilPencarianPage');
    
  }
}
