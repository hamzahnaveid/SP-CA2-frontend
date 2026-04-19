import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders: any;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.adminService.getOrders().subscribe(
      (response) => {
        console.log(response)
        this.orders = response;
      }
    )
  }

  toNextState(orderId:number) {
    this.adminService.toNextState(orderId).subscribe(
      (response) => {
        this.snackBar.open("Successfully moved to next state!", "Close", {
          duration: 5000
        })
        this.getOrders();
      },
      (error) => {
        this.snackBar.open("Order has already been fully processed", "Close", {
          duration: 5000
        })
      }
    )
  }

}
