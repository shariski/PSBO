import { Component } from '@angular/core';


import { LaporanPetaniPage } from '../laporan-petani/laporan-petani';
import { PesananPetaniPage  } from '../pesanan-petani/pesanan-petani';
import { ProfilePetaniPage } from '../profile-petani/profile-petani';

@Component({
  templateUrl: 'tabs-petani.html'
})
export class TabsPetaniPage {

  tab1Root = PesananPetaniPage;
  tab2Root = LaporanPetaniPage;
  tab3Root = ProfilePetaniPage;

  constructor() {

  }
}
