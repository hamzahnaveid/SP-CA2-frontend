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
  sortProductForm!: FormGroup;

  sortBy: string = 'name';
  type: string = 'desc';

  constructor( 
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      term: ['']
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

  deleteProduct(productId:any) {
    this.adminService.deleteProduct(productId).subscribe(
      (response) => {
        this.snackBar.open('Product deleted successfully', 'Close'), {
          duration: 5000
        }
      }
    );
    this.getAllProducts();
  }

  search() {
    this.products = [];
    const term = this.searchProductForm.get('term')!.value;

    this.adminService.getAllProductsByTermAndSort(term, this.sortBy, this.type).subscribe(
      (response) => {
        console.log(term)
        console.log(response)
        response.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.image;
          this.products.push(element);
        })
      }
    );
  }

  sort(type: string) {
    this.type = type;
    this.search();
  }
}
