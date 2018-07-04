import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { ViewPage } from '../view/view';
import { OrderProvider } from '../../providers/order/order';
/**
 * Generated class for the PesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pesanan',
  templateUrl: 'pesanan.html',
})
export class PesananPage {

  orders: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public orderProvider : OrderProvider) {
    // this.semuaOrder = navParams.get('data'); 
    // console.log("semua order", this.semuaOrder);
  }

  ionViewWillEnter(){
    this.cekToken();
  }

  cekToken(){
    if(!this.orderProvider.token){
      this.orderProvider.getToken()
      .then((access_token) => {
          this.orderProvider.token = access_token;
          this.allOrder();
      })
    }else{
        this.allOrder();
    }
  }

  allOrder(){
    this.orderProvider.getOrder().then((result)=>{
      this.orders=result;
      for(var i=0;i<this.orders.length;i++){
        this.orders[i].tanggal_dibuat=this.orders[i].tanggal_dibuat.split('T');
        console.log("tanggal dibuat",this.orders[i].tanggal_dibuat[0])
      }
      console.log("semua order", this.orders);
      console.log("token di pesanan", this.orderProvider.getToken());
    },(err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesananPage');
  }


openViewPage(order){
    this.navCtrl.push('ViewOrderPetaniPage',{data: order});
  }
}
