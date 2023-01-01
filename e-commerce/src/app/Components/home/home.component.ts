import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularProducts:undefined|product[]
  trendyProducts:undefined|product[]


  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private _productService:ProductService){}

  ngOnInit(): void {
   this.popular_Products()
   this.trendy_Products()
  }

  trendy_Products(){
    this._productService.trendyProducts().subscribe(
      (result:any)=>{
         this.trendyProducts=result
      }
    )
  }

  popular_Products(){
    this._productService.popularProducts().subscribe(
      (result:any)=>{
          this.popularProducts=result
      }
    )
  }


}
