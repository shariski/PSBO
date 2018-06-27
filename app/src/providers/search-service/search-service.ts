import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

let apiUrl = 'http://localhost:3000';
/*
  Generated class for the SearchServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchServiceProvider {
  result:any;

  constructor(
    public http: Http,
    private storage: Storage) {
    console.log('Hello SearchServiceProvider Provider');
  }

  search(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(apiUrl+'/users/search', JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());  
            this.result = res.json();
            console.log("respon",this.result);
            // this.message = this.data.message;
            // this.token = this.data.token;
            // this.storage.set("token",this.token);
            // this.userId = this.data.userId;
            // console.log("role",this.data.role);
            // console.log("token",this.token);
            // localStorage.setItem('token', this.data.token);
            // this.tes = localStorage.getItem('token');
            // console.log("isi storage",this.tes);
           }, (err) => {
            reject(err);
          });
    });
  }

}
