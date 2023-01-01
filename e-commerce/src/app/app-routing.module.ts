import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerauthGuard } from 'src/services/sellerauth.guard';
import { HomeComponent } from './Components/home/home.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { SearchComponent } from './Components/search/search.component';
import { SellerAddProductComponent } from './Components/seller-add-product/seller-add-product.component';
import { SellerHomeComponent } from './Components/seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './Components/seller-update-product/seller-update-product.component';
import { SellerComponent } from './Components/seller/seller.component';
import { UserAuthComponent } from './Components/user-auth/user-auth.component';

const routes: Routes = [
  {
   path:'',
   component:HomeComponent
  },
  {
    path:'seller-auth',
    component:SellerComponent
  },
  {
    path:'seller-home',
    component:SellerHomeComponent,
    canActivate:[SellerauthGuard]
  },
  {
    path:'seller-add-product',
    component:SellerAddProductComponent,
    canActivate:[SellerauthGuard]
  },
  {
    path:'seller-update-product/:id',
    component:SellerUpdateProductComponent,
    canActivate:[SellerauthGuard]
  },
  {
    path:'search/:query',
    component:SearchComponent
  },
  {
    path:'details/:id',
    component:ProductDetailsComponent
  },
  {
    path:'user-auth',
    component:UserAuthComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
