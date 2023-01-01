import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  
  addedMsg:string|undefined;
  constructor(private _productService:ProductService){}
  
  ngOnInit(): void {
    
  }

  submit(productData:product){
    
    this._productService.addProduct(productData).subscribe(
      (result:any)=>{
          if(result){
            this.addedMsg='Product added Successfully'
          }
          
      }
    );

    setTimeout(()=>
    {this.addedMsg=undefined}
    ,3000)
  }

}
