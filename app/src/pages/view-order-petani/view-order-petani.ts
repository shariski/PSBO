import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the ViewOrderPetaniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-order-petani',
  templateUrl: 'view-order-petani.html',
})
export class ViewOrderPetaniPage {

  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public orderProvider: OrderProvider) {
    this.data=navParams.get('data');
    console.log("view order", this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewOrderPetaniPage');
  }

  cekToken(id){
    if(!this.orderProvider.token){
      this.orderProvider.getToken()
      .then((access_token) => {
          this.orderProvider.token = access_token;
          this.batalOrder(id);
      })
    }else{
        this.batalOrder(id);
    }
  }

  batalOrder(id){
    this.orderProvider.deleteOrder(id);
    this.navCtrl.pop();
  }

}
