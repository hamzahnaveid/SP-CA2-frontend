import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss']
})
export class OrderItemsComponent {

  orderItems: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog 
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.orderItems = [];
    this.customerService.getOrderItems(this.data.orderId).subscribe(
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
    this.dialog.closeAll();
  }
}
