import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  implements OnInit {
  
  searchResult:undefined|product[]
  query:any;
  
  constructor(private _router:ActivatedRoute,private _productService:ProductService){}


  ngOnInit(): void {
    
   this.query = this._router.snapshot.params['query']

   this._productService.searchProducts(this.query).subscribe(
    (result:any)=>{
      this.searchResult=result
    }
   )
    
  }

  

}
