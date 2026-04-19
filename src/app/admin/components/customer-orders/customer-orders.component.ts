import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerOrderItemsComponent } from '../customer-order-items/customer-order-items.component';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent {

  orders: any[] = [];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    public dialog: MatDialog 
  ) {}
  
  ngOnInit() {
    this.getCustomerOrders();
  }
  
  getCustomerOrders() {
    this.orders = [];
    this.adminService.getOrdersByUserEmail(this.data.userEmail).subscribe(
      (response) => {
        console.log(response)
        this.orders = response;
      }
    )
  }

  viewItems(orderId) {
    this.dialog.open(CustomerOrderItemsComponent, {
      data: {orderId: orderId}
    });
  }
  
  closeForm() {
    this.dialog.closeAll();
  }

}
