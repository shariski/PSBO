import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { SearchServiceProvider } from '../../providers/search-service/search-service';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
 @Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  loading: any;
  lokasi: string;
  luas: any;
  spesialisasi: string;
  role:string = "petani";
  status:string = "menunggu pembayaran";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public searchService: SearchServiceProvider,
    public loadCtrl: LoadingController,
    private toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  cari(){
    let data = {
      lokasi:this.lokasi,
      spesialisasi:this.spesialisasi,
      role:this.role
    }
    let dataOrder = {
      lokasi:this.lokasi,
      luas:this.luas,
      spesialisasi:this.spesialisasi,
      status:this.status
    }
    this.showLoader();
    this.searchService.search(data).then((result) => {
    this.loading.dismiss();
    this.navCtrl.push('HasilPencarianPage', {data: result, dataOrder: dataOrder});
    console.log(result,data); 
  }, (err) => {
    this.loading.dismiss();
    this.presentToast(err);
    console.log(err);
  });
  console.log(this.lokasi,this.spesialisasi)
  }

showLoader() {
  this.loading = this.loadCtrl.create({
    content: 'memuat..'
  });

  this.loading.present();
}

presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom',
    dismissOnPageChange: true
  });
  
  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

}
