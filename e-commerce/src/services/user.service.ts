import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, signUp } from 'src/app/data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoginError=new EventEmitter<boolean>(false)

  constructor(private _http: HttpClient, private route: Router) { }

  signUpUser(data: signUp) {
  
    return this._http.post('http://localhost:3000/users', data, { observe: 'response' }).subscribe(
      (result: any) => {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.route.navigate(['/']);
      }
    )

  }

  userOnLoad(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/'])
    }
  }


  userLogin(data:login){
    this._http.get<login>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe(
      (result:any)=>{
        if(result && result.body && result.body.length===1){
          this.isUserLoginError.emit(false)
          this.route.navigate(['/'])

          localStorage.setItem('user',JSON.stringify(result.body))
        }
        else{
          this.isUserLoginError.emit(true)
          console.log("User Not found")
        }
      }
    )
  }

}
