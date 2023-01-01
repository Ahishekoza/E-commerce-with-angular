import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})

export class SellerUpdateProductComponent implements OnInit {


  productId: number = 0;
  productDetail: undefined | product;
  productMessage: string = '';

  constructor(private _router: ActivatedRoute, private _productService: ProductService,private route:Router) { }

  ngOnInit(): void {

    this.productId = this._router.snapshot.params['id']
    this.getProductById()
  }

  getProductById(): void {
    this._productService.getProductById(this.productId).subscribe(
      (result: any) => {
        console.log(result)
        this.productDetail = result
      }
    )
  }

  submit(productData: product) {

    productData.id=this.productId

    this._productService.updateProduct(productData).subscribe(
      (result: any) => {
        this.productMessage = "Product Updated Successfully"
        
      }
    )

    setTimeout(()=>{
      this.productMessage=''
      this.route.navigate(['seller-home'])
    }
    
    ,3000)
  }

}
