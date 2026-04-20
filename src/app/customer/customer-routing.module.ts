import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ReviewProductComponent } from './components/review-product/review-product.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  {path: 'home', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'orders', component: MyOrdersComponent},
  {path: 'review/:productId', component: ReviewProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
