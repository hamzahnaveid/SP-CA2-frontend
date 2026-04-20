import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.scss']
})
export class ReviewProductComponent {
  productId = this.activatedRoute.snapshot.params['productId'];
  reviewForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.reviewForm = this.fb.group({
      rating: [null, [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  submitForm() {
    const formData: FormData = new FormData();
    formData.append('rating', this.reviewForm.get('rating').value);
    formData.append('description', this.reviewForm.get('description').value);
    formData.append('userEmail', this.storage.getUser().email);
    formData.append('productId', this.productId);
    formData.append('userName', this.storage.getUser().name);

    this.customerService.addReview(formData).subscribe(
      (response) => {
        this.snackBar.open("Added review successfully!", "Close", {
          duration: 5000
        });
        this.router.navigateByUrl('/customer/orders');
      },
      (error) => {
        this.snackBar.open("Failed to add review. Please try again.", "Close", {
          duration: 5000
        })
      }
    )
  }

}
