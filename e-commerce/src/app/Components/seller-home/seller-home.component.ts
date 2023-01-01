import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productMessage: string = '';
  productList: undefined | product[];
  icon=faTrash
  iconEdit=faEdit
  constructor(private _productService: ProductService, private route: Router) { }


  ngOnInit(): void {
    this.list()
  }

  // --------------------This will help to delete unwanted Product
  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe(
      (result: any) => {
        this.productMessage = "Product Got Deleted"
        
        this.list()
      }
    )
    setTimeout(()=>{
      this.productMessage=''
    },3000)
  }


  // ----------------------------This will Display all the products 
  list(){
    this._productService.getAllProducts().subscribe(
      (data: any) => {
        console.log(data)
        this.productList = data
      }
    )
  }
}
