import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerOrdersComponent } from '../customer-orders/customer-orders.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  customers: any;
  
  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  
  ngOnInit() {
    this.getCustomers();
  }
  
  getCustomers() {
    this.adminService.getCustomers().subscribe(
      (response) => {
        console.log(response)
        this.customers = response;
      }
    )
  }

  viewOrders(userEmail:any) {
    this.dialog.open(CustomerOrdersComponent, {
      data: {userEmail: userEmail}
    });
  }

}
