import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddVoucherComponent } from './components/add-voucher/add-voucher.component';
import { VouchersComponent } from './components/vouchers/vouchers.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CustomersComponent } from './components/customers/customers.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'category', component: AddCategoryComponent},
  {path: 'product', component: AddProductComponent},
  {path: 'product/:productId', component: UpdateProductComponent},
  {path: 'add-voucher', component: AddVoucherComponent},
  {path: 'get-vouchers', component: VouchersComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'customers', component: CustomersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
