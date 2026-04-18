import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartItems: any[] = [];
  order: any;

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCart();
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

}
