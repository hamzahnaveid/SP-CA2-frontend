import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor( 
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      term: [null]
    })
  }

  getAllProducts(){
    this.products = [];
    this.adminService.getAllProducts().subscribe(
      (response) => {
        console.log(response)
        response.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.image;
          this.products.push(element);
        })
      },
      (error) => {
        this.snackBar.open(error.message, "Close", {
              duration: 5000,
              panelClass: 'error-snackbar'
            });
      }
    );
  }

  search() {
    this.products = [];
    const term = this.searchProductForm.get('term')!.value;

    this.adminService.getAllProductsByTerm(term).subscribe(
      (response) => {
        console.log(response)
        response.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.image;
          this.products.push(element);
        })
      }
    );
  }

  

}
