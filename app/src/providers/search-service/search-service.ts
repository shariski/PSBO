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
           }, (err) => {
            reject(err);
          });
    });
  }

}
