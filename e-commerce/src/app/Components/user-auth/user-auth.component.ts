import { Component, OnInit } from '@angular/core';
import { login, signUp } from 'src/app/data-type';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  
  showLogin:boolean=false;

  authError:string='';


  constructor(private _userService:UserService){}

  ngOnInit(): void {
    
    this._userService.userOnLoad()

  }

  signUp(data:signUp){

    this._userService.signUpUser(data)

  }

  openLogin(){

    this.showLogin=true

  }


  login(data:login){
    this._userService.userLogin(data)
    
    this._userService.isUserLoginError.subscribe(
      (result:any)=>{
        this.authError="UserName or Password undefined "
      }
    )

  }

  openSignUp(){

    this.showLogin=false

  }

}
