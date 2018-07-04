import { Component, ViewChild } from '@angular/core';
import { Nav, NavController } from 'ionic-angular';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
    @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController) {

  }
  konfirm(){
    
  }

}
