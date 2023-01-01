import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: number = 0;
  productData: undefined | product

  productQuantity: number = 1;

  removeProduct = false

  constructor(private _router: ActivatedRoute, private _productService: ProductService) { }


  ngOnInit(): void {
    this.productId = this._router.snapshot.params['id']

    this.getProductValueById()


    let cartData= localStorage.getItem('localCart');
      if(this.productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>this.productId=== item.id);
        if(items.length){
          this.removeProduct=true
        }else{
          this.removeProduct=false
        }
      }


  }

  getProductValueById() {
    this._productService.getProductById(this.productId).subscribe(
      (result: any) => {
        console.log(result)
        this.productData = result
      }
    )
  }

  handleQuantity(value: string) {
    if (value == 'min' && this.productQuantity > 1) {
      this.productQuantity -= 1
    }
    else if (value == 'plus' && this.productQuantity < 20) {
      this.productQuantity += 1
    }
  }

  addToCart() {

    if (this.productData) {
      this.productData.quantity = this.productQuantity
      console.log(this.productData)
      this._productService.addToLocalCart(this.productData)
    }

  }

  removeToCart(id: number) {
    
    this._productService.removeItemFromcart(id)
  }

}
