import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login, signUp } from 'src/app/data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  // -----------------To check if the user is logined or not
  isLogin = new BehaviorSubject<boolean>(false)

  // ----------------To Check whether authenticate user as login or not
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private _http: HttpClient, private route: Router) { }

  signUp(data: signUp) {
    // localStorage.setItem('data',data.name)
    this._http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe(
      (result: any) => {
        this.isLogin.next(true)
        // --------------------------Storing seller------------
        localStorage.setItem('seller', JSON.stringify(result.body))

        // ----------Redirecting to seller-home once seller is logined in
        this.route.navigate(['seller-home'])
        console.log(result)
      }
    )



  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isLogin.next(true)
      this.route.navigate(['seller-home'])
    }
  }



  // -------------------------------Login Services
  login(data: login) {
    this._http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((result: any) => {
        console.log(result)

        // ------------------------If result is not null then only user details will get added in to local storage
        if (result.body && result && result.body.length === 1) {
          this.isLoginError.emit(false)
          // ----------------- If My User is present then we will redirect to seller-home
          this.route.navigate(['seller-home'])
          // -----------------And will store data into localstorage untill user is logined in
          localStorage.setItem('seller', JSON.stringify(result.body))
        }
        else {
          console.log('Login error occur')
          this.isLoginError.emit(true)
        }


      })
  }



}
