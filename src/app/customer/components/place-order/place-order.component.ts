import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent {

  orderForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog,
    public storage: StorageService
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      address: ['', [Validators.required]],
      payment: ['', Validators.required]
    })

    const user = this.storage.getUser();
    if (user.shippingAddress != '' && user.paymentMethod != '') {
      console.log(user);
      const existingValues = {
        address: user.shippingAddress,
        payment: user.paymentMethod
      }
      this.orderForm.patchValue(existingValues);
    }
  }

  placeOrder() {
    this.customerService.placeOrder(this.orderForm.value).subscribe(
      (response) => {
        if (response.id != null) {
          this.snackBar.open("Order placement successfully!", "Close", { duration: 5000} )
          this.router.navigateByUrl("/customer/orders");
        }
        else {
          this.snackBar.open("Order placement failed", "Close", { duration: 5000} )
        }
        this.closeForm();
      }
    )
  }

  closeForm() {
    this.dialog.closeAll();
  }

}
