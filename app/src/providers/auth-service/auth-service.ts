import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
// import { Storage } from '@ionic/storage';
let apiUrl = 'http://localhost:3000';


@Injectable()
export class AuthServiceProvider {
  data:any;
  message:any;
  token:any;
  tes:any;
  userId:any;
  hasLoggedIn: boolean=false;
  
  constructor(
    public http: Http,
    private storage: Storage ) {}
  
  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(apiUrl+'/users/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            resolve(res.json()); 
            this.data = res.json();
            this.LoggedIn();
            // this.userData();
            console.log("respon",this.data);
            this.message = this.data.message;
            this.token = this.data.token;
            this.storage.set("token",this.token);
            this.userId = this.data.userId;
           }, (err) => {
            reject(err);
          });
    });
  }

  LoggedIn(){
    this.hasLoggedIn=true;
    return this.hasLoggedIn;
  }

  // userData(){
  //   if(this.LoggedIn){
  //     return this.data;
  //   }
  //   else{
  //     return "error";
  //   }
  // }

  getData()
  {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      console.log('Token', this.token);
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization','Bearer '+ this.token);
      console.log("header auth", headers);
      this.http.get(apiUrl+'/users', {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  register(data) {
  return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
   
      this.http.post(apiUrl+'/users/signup', JSON.stringify(data), {headers: headers})
        .subscribe(res => {
          resolve(res);
          
        }, (err) => {
          reject(err);
        });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.storage.clear();
  }
}
