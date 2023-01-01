import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from 'src/app/data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  cartData=new EventEmitter<[]>();

  constructor(private _http:HttpClient) { }

  addProduct(data: product) {
    return this._http.post('http://localhost:3000/products', data);
  }

  getAllProducts(){
    return this._http.get<product[]>('http://localhost:3000/products')
  }

  getProductById(id:number){
    return this._http.get<product>(`http://localhost:3000/products/${id}`)
  }

  deleteProduct(id:number){
    return this._http.delete(`http://localhost:3000/products/${id}`)
  }

  updateProduct(productDetail:product,){
    return this._http.put<product>(`http://localhost:3000/products/${productDetail.id}`,productDetail)
  }

  popularProducts(){
    return this._http.get('http://localhost:3000/products?_limit=3')
  }

  trendyProducts(){
    return this._http.get('http://localhost:3000/products?_limit=8')
  }

  searchProducts(query:KeyboardEvent){
    return this._http.get(`http://localhost:3000/products?q=${query}`)
  }

  addToLocalCart(productData:product){
    let data=[];
    // ----------------check if data is present from first or not
    let localCart=localStorage.getItem('local')

    if(!localCart){
      // ----------Many items can be added so we have taken list
      localStorage.setItem('local',JSON.stringify([productData]))
    }
    else{

      //  JSON. parse() is used for parsing data that was received as JSON; 
      //  it deserializes a JSON string into a JavaScript object. 
      data=JSON.parse(localCart)
      console.log(data)
      data.push(productData)
      localStorage.setItem('local',JSON.stringify(data))
    }

    this.cartData.emit(data)
  }

  removeItemFromcart(productId:number){
    let cartData = localStorage.getItem('local');
    if (cartData) {
      let items:any= JSON.parse(cartData);
      items = items.filter((item:any) => productId !== item.id);
      console.log(items)
      localStorage.setItem('local', JSON.stringify(items));
      this.cartData.emit(items);
    }
    

  }
}
