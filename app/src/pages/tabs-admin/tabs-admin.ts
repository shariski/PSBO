import { Component } from '@angular/core';


import { AdminPage } from '../admin/admin';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs-admin.html'
})
export class TabsAdminPage {

  tab1Root = AdminPage;
  tab2Root = ProfilePage;

  constructor() {

  }
}
