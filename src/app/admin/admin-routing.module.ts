import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddVoucherComponent } from './components/add-voucher/add-voucher.component';
import { VouchersComponent } from './components/vouchers/vouchers.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'category', component: AddCategoryComponent},
  {path: 'product', component: AddProductComponent},
  {path: 'add-voucher', component: AddVoucherComponent},
  {path: 'get-vouchers', component: VouchersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
