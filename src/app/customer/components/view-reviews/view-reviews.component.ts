import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.component.html',
  styleUrls: ['./view-reviews.component.scss']
})
export class ViewReviewsComponent {
  productId = this.activatedRoute.snapshot.params["productId"];

  reviews: any[] = []

  constructor(
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getReviews();
  }

  getReviews() {
    this.reviews = [];
    this.customerService.getAllReviews(this.productId).subscribe(
      (response) => {
        this.reviews = response;
      },
      (error) => {
        this.snackBar.open("Error fetching reviews", "Close", {
          duration: 5000
        })
      }
    )
  }
}
