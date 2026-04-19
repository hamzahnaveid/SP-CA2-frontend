import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../AngularMaterialModule';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddVoucherComponent } from './components/add-voucher/add-voucher.component';
import { VouchersComponent } from './components/vouchers/vouchers.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { CustomerOrderItemsComponent } from './components/customer-order-items/customer-order-items.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AddCategoryComponent,
    AddProductComponent,
    AddVoucherComponent,
    VouchersComponent,
    OrdersComponent,
    CustomersComponent,
    CustomerOrdersComponent,
    CustomerOrderItemsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule
  ]
})
export class AdminModule { }
