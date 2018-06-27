import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaporanPetaniPage } from './laporan-petani';

@NgModule({
  declarations: [
    LaporanPetaniPage,
  ],
  imports: [
    IonicPageModule.forChild(LaporanPetaniPage),
  ],
})
export class LaporanPetaniPageModule {}
