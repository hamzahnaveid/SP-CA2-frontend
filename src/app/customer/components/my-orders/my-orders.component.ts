import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {

  orders: any;
  
  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog
    ) {}
  
  ngOnInit() {
    this.getOrders();
  }
  
  getOrders() {
    this.customerService.getMyOrders().subscribe(
      (response) => {
        console.log(response)
        this.orders = response;
      }
    )
  }

  viewItems(orderId) {
    this.dialog.open(OrderItemsComponent, {
      data: {orderId: orderId}
    });
  }
}
