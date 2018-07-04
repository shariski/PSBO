import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the DetailTransaksiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-transaksi',
  templateUrl: 'detail-transaksi.html',
})
export class DetailTransaksiPage {
  dataPetani:any;
  dataOrder:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public orderProvider : OrderProvider) {
    this.dataPetani = navParams.get('dataPetani');
    this.dataOrder = navParams.get('dataOrder');
    console.log("dataPetani", this.dataPetani);
    console.log("dataOrder", this.dataOrder);
  }

  cekToken(){
    if(!this.orderProvider.token){
      this.orderProvider.getToken()
      .then((access_token) => {
          this.orderProvider.token = access_token;
          this.order();
      })
    }else{
        this.order();
    }
  }
  order() {
        let orderData = {
          tanggal: this.dataOrder.tanggal,
          lokasi: this.dataOrder.lokasi,
          luas: this.dataOrder.luas,
          harga:this.dataPetani.harga*this.dataOrder.luas,
          status:this.dataOrder.status,
          userIdPetani:this.dataPetani._id  
        }
        console.log("order data",orderData);
        this.orderProvider.order(orderData).then((result)=>{
          this.navCtrl.setRoot('PesananPage');
        },(err) => {
          console.log(err);
        });
  }

  // getOrderdiProvider() {
  //   this.orderProvider.getOrder().then((result)=>{
  //     this.navCtrl.setRoot('PesananPage', {data: result});
  //   },(err) => {
  //     console.log(err);
  //   });
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailTransaksiPage');
  }

}
