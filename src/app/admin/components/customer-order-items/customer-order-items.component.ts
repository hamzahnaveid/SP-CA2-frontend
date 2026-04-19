import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-order-items',
  templateUrl: './customer-order-items.component.html',
  styleUrls: ['./customer-order-items.component.scss']
})
export class CustomerOrderItemsComponent {

  orderItems: any[] = [];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog 
  ) {}
  
  ngOnInit() {
    this.getItems();
  }
  
  getItems() {
    this.orderItems = [];
    this.adminService.getOrderItemsByOrderId(this.data.orderId).subscribe(
      (response) => {
        console.log(response)
        this.orderItems = response
        this.orderItems.forEach(element => {
          element.cartDto.image = 'data:image/jpeg;base64,' + element.cartDto.image;
        })
      },
      (error) => {
        console.log(error)
        this.snackBar.open("Error fetching items.", "Close", {
          duration: 5000
        });
      }
    )
  }
  
  closeForm() {
    this.dialog.getDialogById
  }

}
