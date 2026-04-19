import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartItems: any[] = [];
  order: any;

  voucherForm!: FormGroup

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.voucherForm = this.fb.group({
      code: ['', [Validators.required]]
    })
    this.getCart();
  }

  applyVoucher() {
    this.customerService.applyVoucher(this.voucherForm.get(['code'])!.value).subscribe(
      (response) => {
        console.log(response)
        this.snackBar.open("Discount applied successfully!", "Close", {
          duration: 5000
        });
        this.getCart();
      },

      (error) => {
        this.snackBar.open("Invalid voucher", "Close", {
          duration: 5000
        });
      }
    )
  }

  getCart() {
    this.cartItems = [];
    this.customerService.getCartByUserEmail().subscribe(
      (response) => {
        console.log(response);
        this.order = response;
        response.cartItems.forEach(element => {
          element.image = 'data:image/jpeg;base64,' + element.image;
          this.cartItems.push(element);
        })
      },
      (error) => {
        console.log(error)
        this.snackBar.open("Error fetching cart.", "Close", {
          duration: 5000
        });
      }
    )
  }

  placeOrder() {
    this.dialog.open(PlaceOrderComponent)
  }

}
