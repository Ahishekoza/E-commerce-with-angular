import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  element: any;
  userName:string=''
  menuType: string = 'default'

  searchResult:undefined|product[]

  // ------Seller Name---------
  sellerName: string = '';

  // ---------------No Of Items In Cart
  cartItems=0

  constructor(private route: Router, private _productService: ProductService) { }

  ngOnInit(): void {

    this.route.events.subscribe(
      (val: any) => {
        if (val.url) {
          if (localStorage.getItem('seller') && val.url.includes('seller')) {


            let sellerName_ = localStorage.getItem('seller')
            let sellerData = sellerName_ && JSON.parse(sellerName_)[0]
            this.sellerName = sellerData.name

            console.log("in seller area")
            this.menuType = 'seller'
          }
          else if(localStorage.getItem('user')){
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore)[0];
            this.userName= userData.name;
            this.menuType='user';
            // this.product.getCartList(userData.id);
          }
          else {
            this.menuType = 'default'
            console.log("otside area")
          }
        }
      }
    )


    const cartData=localStorage.getItem('local')
    if(cartData){
      this.cartItems=JSON.parse(cartData).length
      
    }


    this._productService.cartData.subscribe(
      (items:any)=>{
        this.cartItems=items.length
      }
    )

  }

  // ---------------Logout User Onces Clicked
  logout() {
    localStorage.removeItem('seller')
    this.route.navigate([''])
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    // this.product.cartData.emit([])
  }

  // KeyboardEvent objects describe a user interaction with the keyboard; each event describes a single interaction between the 
  // user and a key(or combination of a key with modifier keys) on the keyboard.
  // The event type(keydown, keypress, or keyup) identifies what kind of keyboard activity occurred.


  // The HTMLInputElement interface provides special properties and methods for manipulating the 
  // options, layout, and presentation of <input> elements.

  // --------------------Search Product
  searchProduct(query: KeyboardEvent) {
  this.element = query.target as HTMLInputElement

  this._productService.searchProducts(this.element.value).subscribe(
    (result: any) => {
      this.searchResult=result
    }
  )
}


hideSearch(){
  this.searchResult=undefined
}

redirectToDetails(id:number){
  this.route.navigate(['/details/'+id])
}

submitSearch(value:string){
  this.route.navigate([`/search/${value}`])
}

}
