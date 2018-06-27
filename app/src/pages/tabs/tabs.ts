import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import { LaporanPage} from '../laporan/laporan';
import { PesananPage  } from '../pesanan/pesanan';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PesananPage;
  tab3Root = LaporanPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
