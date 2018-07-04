import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { AuthServiceProvider } from '../auth-service/auth-service';

let apiUrl = 'http://localhost:3000';
/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {
  public data : any;
  public token: any;
  
  constructor( public http: Http,
    public storage: Storage,
    public auth: AuthServiceProvider) {
    console.log('Hello OrderProvider Provider');
  }

  getToken() {
    return this.storage.get('token');
  }

  order(data) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization','Bearer '+ this.token);
      console.log("header order", headers);
      this.http.post(apiUrl+"/orders", JSON.stringify(data), {headers: headers})
        .subscribe(res => {
          console.log(res);
          resolve(res.json());
          this.data = res.json();          
          }, (err) => {
          reject(err);
        });
    });
  }

  getOrder() {
    return new Promise((resolve,reject)=>{
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization','Bearer '+ this.token);
      this.http.get(apiUrl + "/orders", {headers: headers}).subscribe(res => {
        console.log("get order",res);
        resolve(res.json());
        }, (err) => {
        reject(err);
      });
    });
  }

  deleteOrder(id) {
    console.log("id batal",id)
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization','Bearer '+ this.token);
      console.log("header order", headers);
      this.http.delete(apiUrl+"/orders/"+id, {headers: headers})
        .subscribe(res => {
          console.log(res);
          resolve(res);         
          }, (err) => {
          reject(err);
        });
    });
  }

}
