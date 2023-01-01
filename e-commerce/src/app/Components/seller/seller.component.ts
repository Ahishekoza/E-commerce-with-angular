import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login, signUp } from 'src/app/data-type';
import { SellerService } from 'src/services/seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  // ------------This value will display Login Form on a click
  login: boolean = false;

  // -----------------To Show the error msg
  errorMsg: string = '';


  constructor(private _sellerService: SellerService, private route: Router) { }

  ngOnInit(): void {
    this._sellerService.reloadSeller()
  }

  signUp(data: signUp) {
    this._sellerService.signUp(data)
  }


  Login(data: login) {
    this._sellerService.login(data)

    this._sellerService.isLoginError.subscribe(
      (error: any) => {
        this.errorMsg = "User Or Password InCorrect"
      }
    )

  }

  openLogin() {
    this.login = true
  }

  openSignUp() {
    this.login = false
  }

}
